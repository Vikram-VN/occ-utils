const axios = require("axios");
const fs = require("fs");

const INSTANCE_URL = "https://test-admin.occa.ocs.oraclecloud.com"; //Change the link with your instance link
const AUTH_TOKEN = ""; // Authorization token 

const startProductMapping = async (productId, tileId, type = 0, wait = false) => {

    const fields = ["x_refuseRSP", "x_mixerRSP"]; //Fields that you want to map

    try {

        const getTiledata = await axios.request({
            method: "GET",
            baseURL: INSTANCE_URL,
            url: `/ccadminui/v1/products/${productId}?includePrices=false&minimalEdit=true&showCatalogsInfo=true`,
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
            url: `/ccadminui/v1/products/${productId}?includePrices=false`,
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
        const log = fields[type] + " -> " + productId + " -> " + setTileData[fields[type]] + "|" + INSTANCE_URL + "\r\n";
        setTileData[fields[type]] && fs.appendFileSync("success-list.log", log, { encoding: "utf-8" })
        console.log(fields[type], " -> ", productId + " -> " + setTileData[fields[type]] + "\r\n");

    } catch (e) {
        const log = fields[type] + " -> " + productId + " -> " + e.response?.data?.message + "|" + INSTANCE_URL + "\r\n"
        fs.appendFileSync("error-list.log", log, { encoding: "utf-8" })
        console.log(fields[type], " -> ", productId + " -> " + e.response?.data?.message + "\r\n");
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