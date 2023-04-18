const fs = require("fs");
const country = require('countrystatesjs');
//The fs module enables interacting with the file system in a way modeled on standard POSIX functions

const accounts = JSON.parse(fs.readFileSync('./data/accounts-refuse.json'));


const finalData = { organization: []};

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

accounts.forEach((account, index) => {

    const countryState = country.state(account["Billing Address Country"], account["Billing Address State"])?.abbreviation;
    const template = JSON.parse(fs.readFileSync('./data/AccountsTemplate.json'));

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
    template.billingAddress.city = account["Billing Address City"] ?? null;
    template.billingAddress.state = countryState ? countryState : account["Billing Address State"] + " needToUpdate";
    template.billingAddress.postalCode = account["Billing Address Zip"];
    template.billingAddress.country = account["Billing Address Country"];

    template.shippingAddress.companyName = account["Billing Address Company Name"];
    template.shippingAddress.address1 = account["Billing Address Line 1"];
    template.shippingAddress.address2 = account["Billing Address Line 2"] ?? null;
    template.shippingAddress.address3 = account["Billing Address Line 3"] ?? null;
    template.shippingAddress.city = account["Billing Address City"] ?? null;
    template.shippingAddress.state = countryState ? countryState : account["Billing Address State"] + " needToUpdate";
    template.shippingAddress.postalCode = account["Billing Address Zip"];
    template.shippingAddress.country = account["Billing Address Country"];

    template.members[0].email = account["Contact Email"];
    template.members[0].firstName = account["Contact First Name"];
    template.members[0].lastName = account["Contact Last Name"];
    finalData.organization[index] = template;
    if (!countryState) {
        // console.log("check here");
    }
});

// Deleting unwanted fields from the data
finalData.organization.forEach(element => {
    delete element.siteOrganizationProperties[0].properties.contract.repositoryId;
    delete element.siteOrganizationProperties[0].properties.contract.creationDate

    delete element.secondaryAddresses;
    delete element.useExternalApprovalWebhook;
    delete element.shippingAddress;
    delete element.relativeRoles;
    delete element.id;
    delete element.dunsNumber;
    delete element.derivedAuthorizationCode;
    delete element.derivedTaxReferenceNumber;
    delete element.contract;
    delete element.vatReferenceNumber;
    delete element.taxExemptionCode;
    delete element.derivedType;
    delete element.allowPunchoutShopping;
    delete element.useAllShippingMethodsFromSite;
    delete element.derivedTaxExemptionCode;
    delete element.derivedAllowPunchoutShopping;
    delete element.derivedVatReferenceNumber;
    delete element.punchoutUserId;
    delete element.uniqueId;
    delete element.lastModifiedTime;
    delete element.authorizationCode;
    delete element.derivedBillingAddress;
    delete element.derivedUniqueId;
    delete element.derivedContract;
    delete element.paymentMethods;
    delete element.derivedDunsNumber;
    delete element.orderPriceLimit;
    delete element.derivedShippingAddress;
    delete element.useAllPaymentMethodsFromSite;
    delete element.derivedDescription;
});


fs.writeFileSync("./data/accounts-refuse-new.json", JSON.stringify(finalData, null, 3));