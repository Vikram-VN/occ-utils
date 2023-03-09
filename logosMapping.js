const fs = require("fs");

const accountsData = JSON.parse(fs.readFileSync("./data/AccountsV2.json", { encoding: "utf-8" }));

accountsData.organization.map(organization => {
    const company = organization.secondaryAddresses[0]?.address.companyName;
    switch (company) {
        case "OLDCASTLE":
            organization.organizationLogo = "/general/Oldcastle.png";
            break;
        case "WM":
            organization.organizationLogo = "/general/WM.png";
            break;
        case "WASTE CONNECTIONS":
            organization.organizationLogo = "/general/Waste Connections Logo.png";
            break;
        case "REPUBLIC SERVICES":
            organization.organizationLogo = "/general/Republic_Services.png";
            break;
        default:
            console.log("Address not found")
    }

});


fs.writeFileSync("./data/AccountsV2_New.json", JSON.stringify(accountsData), {encoding: "utf-8"});