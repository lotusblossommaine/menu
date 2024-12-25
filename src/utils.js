import Papa from 'papaparse';
import csv from './data/menu.csv';
import { DRINKS_SECTION_LIST, NO_SMALL_SECTIONS_FOR_DINE_IN, PU_PU_PLATTERS, SECTIONS_WITH_NO_SIZE_HEADER } from './constants';

export const readCSV = async () => {
    const spreadsheetId = '1pN_J14u6YxM6TB-NEjph5lF3CU_djJPznQPZx7qJCqA';
    const sheetName = 'FINAL';
    const isUseCSV = false;
    const data = isUseCSV ? csv : `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

    const response = await fetch(data);
    const csvString = await response.text();

    return new Promise(resolve => {
        Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                resolve(results.data)
            },
        })
    })
}

const isShowSmallPrice = ({ smallPrice, isTakeout, sectionName }) => {
    if (!smallPrice) {
        return false;
    }

    if (isTakeout) {
        return true;
    }

    return !NO_SMALL_SECTIONS_FOR_DINE_IN.includes(sectionName)
}

export const parseData = (data, isTakeout) => {
    const sections = {};

    data.forEach(item => {
        const { Section, Item, SmallPrice, MediumPrice, LargePrice, SmallQuantity, MediumQuantity, LargeQuantity, ItemDescription } = item;
        const sectionName = PU_PU_PLATTERS.includes(Item) ? Item : Section;

        if (isTakeout && DRINKS_SECTION_LIST.includes(sectionName)) {
            return;
        }

        if (!sections[sectionName]) {
            sections[sectionName] = [];
        }

        const prices = [];
        if (isShowSmallPrice({ smallPrice: SmallPrice, isTakeout, sectionName })) {
            prices.push({ label: 'Small', amount: SmallPrice, quantity: SmallQuantity });
        }
        if (LargePrice) {
            prices.push({ label: 'Large', amount: LargePrice, quantity: LargeQuantity });
        }
        if (MediumPrice) {
            prices.push({ label: 'Medium', amount: LargePrice, quantity: MediumQuantity });
        }

        sections[sectionName].push({
            name: Item,
            prices: prices.length > 0 ? prices : undefined,
            description: ItemDescription,
        });

    });

    const result = Object.entries(sections).map(([sectionName, items]) => ({
        name: sectionName,
        items,
        hasPriceHeader: items.some(item => item.prices?.length > 1) && !SECTIONS_WITH_NO_SIZE_HEADER.includes(sectionName),
    }));

    return result;
};
