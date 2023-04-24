const axios = require("axios");
const fs = require("fs");

const INSTANCE_URL = "https://p11281411c1prd-admin.occa.ocs.oraclecloud.com"; //Change the link with your instance link
const AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsImprdSI6InAxMTI4MTQxMWMxUFJEIiwia2lkIjoiMCIsIng1YyI6bnVsbCwieDV1IjoiaHR0cHM6Ly9wMTEyODE0MTFjMXByZC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NhZG1pbi92MS90ZW5hbnRDZXJ0Q2hhaW4ifQ==.eyJpYXQiOjE2ODIwNTQxODcsImV4cCI6MTY4MjA1Nzc4Nywic3ViIjoic2hhZXN0YS5oYXlhdEBhcGV4aXQuY29tIiwiYXVkIjoiYWRtaW5VSSIsImNvbS5vcmFjbGUuYXRnLmNsb3VkLmNvbW1lcmNlLnJvbGVzIjpbImNzQWdlbnRTdXBlcnZpc29yUm9sZSIsImFkbWluUm9sZSJdLCJvY2NzLmFkbWluLnJvbGVzIjpbImNzQWdlbnRTdXBlcnZpc29yUm9sZSIsImFkbWluUm9sZSJdLCJpc3MiOiJodHRwczovL3AxMTI4MTQxMWMxcHJkLWFkbWluLm9jY2Eub2NzLm9yYWNsZWNsb3VkLmNvbS9vY2NzLWFkbWluIiwib2Njcy5hZG1pbi5sb2NhbGUiOiJlbl9VUyIsIm9jY3MuYWRtaW4udHoiOm51bGwsIm9jY3MuYWRtaW4udGVuYW50VHoiOiJBbWVyaWNhL0NoaWNhZ28iLCJvY2NzLmFkbWluLmtlZXBBbGl2ZVVSTCI6Imh0dHBzOi8vcDExMjgxNDExYzFwcmQtYWRtaW4ub2NjYS5vY3Mub3JhY2xlY2xvdWQuY29tL2tlZXBhbGl2ZSIsIm9jY3MuYWRtaW4udG9rZW5SZWZyZXNoVVJMIjoiaHR0cHM6Ly9wMTEyODE0MTFjMXByZC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NhZG1pbi92MS9zc29Ub2tlbnMvcmVmcmVzaCIsIm9jY3MuYWRtaW4udmVyc2lvbiI6IjIzLjEuMSIsIm9jY3MuYWRtaW4uYnVpbGQiOiJqZW5raW5zLUFzc2VtYmxlX0Nsb3VkX0NvbW1lcmNlX0VBUnNfLW1hc3Rlci0yNzEiLCJvY2NzLmFkbWluLmVtYWlsIjoic2hhZXN0YS5oYXlhdEBhcGV4aXQuY29tIiwib2Njcy5hZG1pbi5wcm9maWxlSWQiOiJpdXNlcjI4Mjg2MjAiLCJvY2NzLmFnZW50Lm9ibyI6bnVsbCwib2Njcy5hZG1pbi5maXJzdE5hbWUiOiJTaGFlc3RhIiwib2Njcy5hZG1pbi5sYXN0TmFtZSI6IkhheWF0Iiwib2Njcy5hZG1pbi5wdW5jaG91dFVzZXIiOmZhbHNlLCJzdWJfdHlwZSI6bnVsbCwic2NvcGUiOm51bGx9.kE2SuF2fPJu2zpvdRi71VljWSQr/4nB2t9161U3D/H1rhc2AzaDNBeNrFTpZ0Yl1UIheaDUlsMB07czSG60yMQWubhjl274q46cmbQatFphWiLMg5+jjL5SvCSQM8FG0vZ8u6Bz6LJhPNcKnFU/242QVJdM9aouLTk+wVQZCxTrnlcRI8IEc66tuPmUymhcB2BMwRoV40wsCbN2IzvIw8r1V75Uw6vL2+0L056zzHjfg5U5eHbQN+3vSPP8TCYgi0hdYEncWi/HxUj8SvlpuXvNEkueEvSdvx1KYEO9o5Zf5vgpDesSdxg3LjjN3F+hd11hWSotBDEDbde0F6xr78Q=="; // Authorization token 

const startProductMapping = async (productId, tileId, type = 0, wait = false) => {

    const fields = ["x_refuseRSP", "x_mixerRSP"]; //Fields that you want to map
    const catalogs = ["refuseCatalog", "mixerCatalog"]; // catalogs

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
        setTileData[fields[type]] && fs.appendFileSync("success-list1.log", log, { encoding: "utf-8" })
        console.log(catalogs[type] + " ->" + fields[type] + " -> " + productId + " -> " + setTileData[fields[type]] + " -> " + INSTANCE_URL + "\r\n");

    } catch (e) {
        const log = catalogs[type] + " -> " + fields[type] + " -> " + productId + " -> " + e.response?.data?.message + " -> " + tileId + " -> " + INSTANCE_URL + "\r\n";
        fs.appendFileSync("error-list1.log", log, { encoding: "utf-8" })
        console.log(catalogs[type] + " -> " + fields[type] + " -> " + productId + " -> " + e.response?.data?.message + " -> " + tileId + " -> " + INSTANCE_URL + "\r\n");
    }
}


const site = 1; // 0 is refuse & 1 is mixer
const wait = true;
const file = ["./data/recommended-refuse.json", "./data/recommended-mixer.json"][site]
const productsData = JSON.parse(fs.readFileSync(file, { encoding: "utf-8" })); // Getting json file data 

productsData.map((data, index) => {
    setTimeout(() => {
        console.log("Now running: ", index, "\r\n")
        startProductMapping(data.Item, data["Product Model"].toUpperCase().replace(new RegExp(" ", "g"), "_") + "|", site, wait);
    }, 5000 * (wait && index));
})