import React from 'react';
import { useEffect, useState } from "react";
import { BANNER_SPREADSHEET_NAME } from "../../constants";
import { readCSV } from "../../utils";
import "./Banner.css";

const processCsvStringToHtml = (csvString) => {
    // Split the string into lines and remove quotes
    const lines = csvString
        .split("\n")
        .map(line => line.replace(/^"|"$/g, ""));

    return (
        <div>
            {lines.map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </div>
    );
};

export const Banner = () => {
    const [bannerMessage, setBannerMessage] = useState();

    useEffect(() => {
        async function fetchData() {
            const csvString = await readCSV({ sheetName: BANNER_SPREADSHEET_NAME });
            setBannerMessage(csvString);
        }
        fetchData();
    }, []);

    if (!bannerMessage) {
        return null;
    }

    return (
        <div className="banner">
            {processCsvStringToHtml(bannerMessage)}
        </div>
    )
}