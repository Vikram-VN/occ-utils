const axios = require("axios");
const fs = require("fs");

const INSTANCE_URL = "https://p11281411c1tst-admin.occa.ocs.oraclecloud.com"; //Change the link with your instance link
const AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsImprdSI6InAxMTI4MTQxMWMxVFNUIiwia2lkIjoiMCIsIng1YyI6bnVsbCwieDV1IjoiaHR0cHM6Ly9wMTEyODE0MTFjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NhZG1pbi92MS90ZW5hbnRDZXJ0Q2hhaW4ifQ==.eyJpYXQiOjE2NzYwMzAyOTIsImV4cCI6MTY3NjAzMzg5Miwic3ViIjoidmlrcmFtLm5hcmF5YW5hcHBhQGFwZXhpdC5jb20iLCJhdWQiOiJhZG1pblVJIiwiY29tLm9yYWNsZS5hdGcuY2xvdWQuY29tbWVyY2Uucm9sZXMiOlsiYWRtaW5Sb2xlIl0sIm9jY3MuYWRtaW4ucm9sZXMiOlsiYWRtaW5Sb2xlIl0sImlzcyI6Imh0dHBzOi8vcDExMjgxNDExYzF0c3QtYWRtaW4ub2NjYS5vY3Mub3JhY2xlY2xvdWQuY29tL29jY3MtYWRtaW4iLCJvY2NzLmFkbWluLmxvY2FsZSI6ImVuX1VTIiwib2Njcy5hZG1pbi50eiI6bnVsbCwib2Njcy5hZG1pbi50ZW5hbnRUeiI6IkV0Yy9VVEMiLCJvY2NzLmFkbWluLmtlZXBBbGl2ZVVSTCI6Imh0dHBzOi8vcDExMjgxNDExYzF0c3QtYWRtaW4ub2NjYS5vY3Mub3JhY2xlY2xvdWQuY29tL2tlZXBhbGl2ZSIsIm9jY3MuYWRtaW4udG9rZW5SZWZyZXNoVVJMIjoiaHR0cHM6Ly9wMTEyODE0MTFjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NhZG1pbi92MS9zc29Ub2tlbnMvcmVmcmVzaCIsIm9jY3MuYWRtaW4udmVyc2lvbiI6IjIyLjQuMiIsIm9jY3MuYWRtaW4uYnVpbGQiOiJqZW5raW5zLUFzc2VtYmxlX0Nsb3VkX0NvbW1lcmNlX0VBUnNfLW1hc3Rlci0yNjUiLCJvY2NzLmFkbWluLmVtYWlsIjoidmlrcmFtLm5hcmF5YW5hcHBhQGFwZXhpdC5jb20iLCJvY2NzLmFkbWluLnByb2ZpbGVJZCI6Iml1c2VyMzU0NjgwIiwib2Njcy5hZ2VudC5vYm8iOm51bGwsIm9jY3MuYWRtaW4uZmlyc3ROYW1lIjoiVmlrcmFtIiwib2Njcy5hZG1pbi5sYXN0TmFtZSI6Im5hcmF5YW5hcHBhIiwib2Njcy5hZG1pbi5wdW5jaG91dFVzZXIiOmZhbHNlLCJzdWJfdHlwZSI6bnVsbCwic2NvcGUiOm51bGx9.QFfDAlg9XfGoNuEHGiRZIGm5iUJBN1xZoPcTqJ95E6AxeQ4f7s1RPWxxIwGRFUqKsGaIhRjiQuMPCDFdUCbwlHLSA2VgVp3So6w7cQqII19dbzWqAWf/Pb7GXrFF/ApTo5vFzkIJtiR1KOvDuBJ0uOTPcLv0Ou2AW/D5clWOxtFroUW18sbyaZ60I6gSYRn55aosHB3sqlhE6R+o+pJ1XR9fMwmv+Mpbb5JnsmawvS3lkLPgJFrUaJUjKwbVVXZV6F25FHWHnNi/dgRR4ILWNUFnnYWO2V3Nr7UvfiVILOIfkptjlboS5Rj48d1c2OQGt/KcJXWbgb2Ljf1w4zxkcw=="; // Authorization token 

const startProductMapping = async (productId, tileId, type = 0, wait = false) => {

    const fields = ["x_refuseRSP", "x_mixerRSP"]; //Fields that you want to map
    const catalogs = ["refuseCatalog", "mixerCatalog"];

    try {

        const getTiledata = await axios.request({
            method: "GET",
            baseURL: INSTANCE_URL,
            url: `/ccadminui/v1/products/${productId}?includePrices=false&minimalEdit=true&showCatalogsInfo=true&catalogId=${catalogs[type]}`,
            headers: {
                "content-type": "application/json",
                "x-ccasset-language": "en",
                "Authorization": `Bearer ${AUTH_TOKEN}`
            }
        }).then(res => res.data);

        let newPayload = null;

        if (getTiledata[fields[type]] !== null && getTiledata[fields[type]] !== "") {
            newPayload = getTiledata[fields[type]] + tileId;
        } else {
            newPayload = tileId;
        }

        const setTileData = await axios.request({
            method: "PUT",
            baseURL: INSTANCE_URL,
            url: `/ccadminui/v1/products/${productId}?includePrices=false&catalogId=${catalogs[type]}`,
            data: {
                properties: {
                    [fields[type]]: wait ? newPayload : ""
                }
            },
            headers: {
                "content-type": "application/json",
                "x-ccasset-language": "en",
                "Authorization": `Bearer ${AUTH_TOKEN}`
            }
        }).then(res => res.data);
        const log = catalogs[type] + " -> " + fields[type] + " -> " + productId + " -> " + setTileData[fields[type]] + " -> " + INSTANCE_URL + "\r\n";
        setTileData[fields[type]] && fs.appendFileSync("success-list.log", log, { encoding: "utf-8" })
        console.log(catalogs[type] + " ->" + fields[type] + " -> " + productId + " -> " + setTileData[fields[type]] + " -> " + INSTANCE_URL + "\r\n");

    } catch (e) {
        const log = catalogs[type] + " -> " + fields[type] + " -> " + productId + " -> " + e.response?.data?.message + " -> " + tileId + " -> " + INSTANCE_URL + "\r\n";
        fs.appendFileSync("error-list.log", log, { encoding: "utf-8" })
        console.log(catalogs[type] + " -> " + fields[type] + " -> " + productId + " -> " + e.response?.data?.message + " -> " + tileId + " -> " + INSTANCE_URL + "\r\n");
    }
}


const site = 1; // 0 is refuse & 1 is mixer
const wait = true;
const file = ["./data/refuse.json", "./data/mixer.json"][site]
const productsData = JSON.parse(fs.readFileSync(file, { encoding: "utf-8" })); // Getting json file data 

productsData.map((data, index) => {
    setTimeout(() => {
        console.log("Now running: ", index, "\r\n")
        startProductMapping(data.Item, data["Product Model"].toUpperCase().replace(new RegExp(" ", "g"), "_") + "|", site, wait);
    }, 5000 * (wait && index));
})