import Papa from 'papaparse';
import csv from './data/menu.csv';
import { BANNER_SPREADSHEET_NAME, DRINKS_SECTION_LIST, NO_SMALL_SECTIONS_FOR_DINE_IN, PU_PU_PLATTERS, SECTIONS_WITH_NO_SIZE_HEADER } from './constants';

export const readCSV = async ({ sheetName }) => {
    const spreadsheetId = '1pN_J14u6YxM6TB-NEjph5lF3CU_djJPznQPZx7qJCqA';
    const isUseCSV = false;
    const data = isUseCSV ? csv : `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
    const response = await fetch(data);
    const csvString = await response.text();

    if (sheetName === BANNER_SPREADSHEET_NAME) {
        return csvString;
    }

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
        if (MediumPrice) {
            prices.push({ label: 'Medium', amount: MediumPrice, quantity: MediumQuantity });
        }
        if (LargePrice) {
            prices.push({ label: 'Large', amount: LargePrice, quantity: LargeQuantity });
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
