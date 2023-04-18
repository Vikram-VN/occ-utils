const fs = require("fs");
//The fs module enables interacting with the file system in a way modeled on standard POSIX functions

const template = JSON.parse(fs.readFileSync('./data/AccountsTemplate.json'));
const accounts = JSON.parse(fs.readFileSync('./data/accounts-refuse.json'));


const finalData = { organization: [] };

const sites = {
    Refuse: {
        id: "siteUS",
        catalogId: "Refuse"
    },
    Mixer: {
        id: "100001",
        catalogId: "mixerCatalog"
    }
}

accounts.forEach(account => {
    template.siteOrganizationProperties[0].site.siteId = sites[account["Site Name"]].id;
    template.name = account["Account Name"];
    template.x_fleetCode = account["Fleet Code"];
    template.x_billAddressList = account["BillTo Address List"];
    template.x_customerType = account["McNeilus Customer Type"];
    template.x_fleetNameJDE = account["Fleet Name (JDE)"];
    template.x_eightyByTwenty = account["80/20"];
    template.siteOrganizationProperties[0].properties.contract.displayName = account["Contract Name"];
    template.siteOrganizationProperties[0].properties.contract.priceListGroup.id = account["Price Group"];
    template.siteOrganizationProperties[0].properties.contract.catalog.id = account["Catalog"];
    template.derivedOrganizationLogo = account["Logo File Name"] ?? null;
    template.billingAddress.companyName = account["Billing Address Company Name"];
    template.billingAddress.address1 = account["Billing Address Line 1"];
    template.billingAddress.address2 = account["Billing Address Line 2"] ?? null;
    template.billingAddress.address3 = account["Billing Address Line 3"] ?? null;
    template.billingAddress.city = account["Billing Address City"];
    template.billingAddress.state = account["Billing Address State"];
    template.billingAddress.postalCode = account["Billing Address Zip"];
    template.billingAddress.country = account["Billing Address Country"];
    // template.shippingAddress.companyName = account["Billing Address Company Name"];
    // template.shippingAddress.address1 = account["Billing Address Line 1"];
    // template.shippingAddress.address2 = account["Billing Address Line 2"] ?? null;
    // template.shippingAddress.address3 = account["Billing Address Line 3"] ?? null;
    // template.shippingAddress.city = account["Billing Address City"];
    // template.shippingAddress.state = account["Billing Address State"];
    // template.shippingAddress.postalCode = account["Billing Address Zip"];
    // template.shippingAddress.country = account["Billing Address Country"];
    template.members[0].email = account["Contact Email"];
    template.members[0].firstName = account["Contact First Name"];
    template.members[0].lastName = account["Contact Last Name"];
    template.members[0].lastName = account["Contact Last Name"];






















    finalData.organization.push(template);
});


fs.writeFileSync("./data/accounts-refuse-new.json", JSON.stringify(finalData, null, 3));