import React, { useEffect, useState } from "react"

import { readCSV, parseData } from "../../utils";
import './Menu.css';
import {
    BEER,
    BEVERAGES,
    COMBO_PLATE_SECTIONS,
    DRINKS,
    FOOD_SECTION_LIST,
    MENU_SPREADSHEET_NAME,
    MIXED_DRINKS,
    NON_ALCOHOLIC_BEER_OPTION,
    SUGGESTIONS,
    WINE
} from "../../constants";
import { Divider } from "../Divider/Divider";
import { MenuGroup } from "../MenuGroup/MenuGroup";

export const Menu = ({ isTakeout, luncheonSpecialsRef, drinksRef }) => {
    const [data, setData] = useState();

    useEffect(() => {
        async function fetchData() {
            const csvData = await readCSV({ sheetName: MENU_SPREADSHEET_NAME });
            const parsedData = parseData(csvData, isTakeout);
            setData(parsedData);
        }
        fetchData();
    }, [isTakeout]);


    if (!data) {
        return null;
    }

    return (
        <div className="menu">
            <MenuGroup data={data} sectionList={FOOD_SECTION_LIST} />
            <Divider ref={luncheonSpecialsRef} />
            <MenuGroup data={data} sectionList={COMBO_PLATE_SECTIONS} />
            <Divider />
            <MenuGroup data={data} sectionList={[SUGGESTIONS]} />
            {!isTakeout &&
                <>
                    <Divider ref={drinksRef} />
                    <MenuGroup data={data} sectionList={[DRINKS]} />
                    <MenuGroup data={data} sectionList={[MIXED_DRINKS]} />
                    <MenuGroup data={data} sectionList={[BEER, WINE, NON_ALCOHOLIC_BEER_OPTION]} />
                    <Divider />
                    <MenuGroup data={data} sectionList={[BEVERAGES]} />
                </>
            }
        </div>
    )
}