const axios = require("axios");
const fs = require("fs");

const INSTANCE_URL = "https://{keep_instance_id_here}-admin.occa.ocs.oraclecloud.com"; //Change the link with your instance link
const AUTH_TOKEN = "access_token"; // Authorization token 

const startProductMapping = async (productId, tileId, type = 0) => {

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
                    [fields[type]]: newPayload
                }
            },
            headers: {
                "content-type": "application/json",
                "x-ccasset-language": "en",
                "Authorization": `Bearer ${AUTH_TOKEN}`
            }
        }).then(res => res.data);

        setTileData[fields[type]] && fs.appendFileSync("success-list.txt", productId + "\r\n")
        console.log(productId + " -> " + setTileData[fields[type]] + "\r\n");

    } catch (e) {
        fs.appendFileSync("error-list.txt", productId + " -> " + e.response?.data?.message + "\r\n")
        console.log(productId + " -> " + e.response?.data?.message + "\r\n");
    }
}



const productsData = JSON.parse(fs.readFileSync("./data/mixer.json", { encoding: "utf-8" })); // Getting json file data 

productsData.map((data, index) => {
    setTimeout(() => {
        console.log("Now running: ", index, "\r\n")
        startProductMapping(data.Item, data["Product Model"].toUpperCase().replace(new RegExp(" ", "g"), "_") + "|", 1);
    }, 5000 * index);
})