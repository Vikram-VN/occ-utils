const fs = require("fs");;
const State = require('country-state-city').State;
const { colorLog: color, accountsLogger: logger } = require("../logs/colorLog");

// Used to print console logs with different colors based on the output
const colorLog = color();

try {

    //The fs module enables interacting with the file system in a way modeled on standard POSIX functions
    // Reading data from the exported accounts
    const accounts = JSON.parse(fs.readFileSync('./data/accountsV2.json'));

    const finalData = { organization: [] };

    //In original excel sheet the catalog names are different, so to get proper catalog names, we created this sites
    const sites = {
        Refuse: {
            id: "siteUS",
            catalogId: "refuseCatalog"
        },
        Mixer: {
            id: "100001",
            catalogId: "mixerCatalog"
        }
    }

    // Iterating accounts to map the fields
    accounts.forEach((account, index) => {
        // Using third-party library to get 2-letter abbreviations for states
        const countryState = State.getStatesOfCountry(account["Billing Address Country"]).find((state) => {
            return state.name === account["Billing Address State"];
        })?.isoCode;
        // Loading accounts templates that has a all required fields 
        const template = JSON.parse(fs.readFileSync('./accounts/AccountsTemplate.json'));

        // Now we are doing fields mapping to template
        template.siteOrganizationProperties[0].site.siteId = sites[account["Site Name"]].id;
        template.name = account["Account Name"];
        template.uniqueId = account["Unique Identification Number"];
        template.x_fleetCode = account["Fleet Code"];
        template.x_billToAddressList = account["BillTo Address List"];
        template.x_punchoutCustomerEmail = account["Punchout Customer Email"];
        template.x_customerType = account["McNeilus Customer Type"];
        template.x_fleetNameJDE = account["Fleet Name (JDE)"];
        template.x_eightyByTwenty = account["80/20"];

        template.siteOrganizationProperties[0].properties.contract.displayName = account["Contract Name"];
        template.siteOrganizationProperties[0].properties.contract.priceListGroup.id = account["Price Group"];
        template.siteOrganizationProperties[0].properties.contract.catalog.id = sites[account["Catalog"]].catalogId;

        template.derivedOrganizationLogo = account["Logo File Name"] ?? null;

        template.secondaryAddresses[0].address.companyName = account["Billing Address Company Name"];
        template.secondaryAddresses[0].address.address1 = account["Billing Address Line 1"];
        template.secondaryAddresses[0].address.address2 = account["Billing Address Line 2"] ?? null;
        template.secondaryAddresses[0].address.address3 = account["Billing Address Line 3"] ?? null;
        template.secondaryAddresses[0].address.city = account["Billing Address City"] ?? null;
        template.secondaryAddresses[0].address.state = countryState;
        template.secondaryAddresses[0].address.postalCode = account["Billing Address Zip"];
        template.secondaryAddresses[0].address.country = account["Billing Address Country"];
        template.secondaryAddresses[0].address.isDefaultBillingAddress = true;
        template.secondaryAddresses[0].address.isDefaultShippingAddress = false;
        template.secondaryAddresses[0].addressType = "Billing";
        // removing last element from array (that is shipping address)
        template.secondaryAddresses.pop();

        // Here we commented the shipping address, because don't want that

        // template.shippingAddress.companyName = account["Billing Address Company Name"];
        // template.shippingAddress.address1 = account["Billing Address Line 1"];
        // template.shippingAddress.address2 = account["Billing Address Line 2"] ?? null;
        // template.shippingAddress.address3 = account["Billing Address Line 3"] ?? null;
        // template.shippingAddress.city = account["Billing Address City"] ?? null;
        // template.shippingAddress.state = countryState ? countryState : account["Billing Address State"] + " needToUpdate";
        // template.shippingAddress.postalCode = account["Billing Address Zip"];
        // template.shippingAddress.country = account["Billing Address Country"];

        // template.members[0].email = account["Contact Email"];
        // template.members[0].firstName = account["Contact First Name"];
        // template.members[0].lastName = account["Contact Last Name"];

        // pushing this data into organization
        finalData.organization[index] = template;
    });

    // Deleting unwanted (these are not mandatory) fields from the data
    finalData.organization.forEach(element => {
        delete element.siteOrganizationProperties[0].properties.contract.repositoryId;
        delete element.siteOrganizationProperties[0].properties.contract.creationDate;
        delete element.siteOrganizationProperties.pop();

        delete element.secondaryAddresses[0].address.id;
        delete element.billingAddress;
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
        // delete element.allowPunchoutShopping;
        delete element.useAllShippingMethodsFromSite;
        delete element.derivedTaxExemptionCode;
        delete element.derivedAllowPunchoutShopping;
        delete element.derivedVatReferenceNumber;
        delete element.punchoutUserId;
        // delete element.uniqueId;
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
        delete element.members;
    });


    finalData.organization.length > 0 ?
        colorLog.success("Mapping for accounts is completed\n Please check 'data' folder with a name 'accountsV2-New.json' to view the data.") && logger.info(finalData) :
        colorLog.info("Something went wrong with the input and output data, please check.") && logger.error(finalData);

    // saving this accounts data into a new file
    fs.writeFileSync("./data/accountsV2-New.json", JSON.stringify(finalData, null, 3));

} catch (error) {
    colorLog.error(error) && logger.error(error);
}
