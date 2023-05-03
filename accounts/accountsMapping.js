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

    // In the original Excel sheet, the catalogue names are different, so to get proper catalogue names, we created this site.
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
            return account["Billing Address State"].toLowerCase().includes(state.name.toLowerCase());
        })?.isoCode;
        // Loading accounts templates that has a all required fields 
        const template = JSON.parse(fs.readFileSync('./accounts/AccountsTemplate.json'));

        // Now we are doing fields mapping to template
        template.name = account["Account Name"];
        template.uniqueId = account["Unique Identification Number"];
        template.x_fleetCode = account["Fleet Code"];
        template.x_billToAddressList = account["BillTo Address List"];
        template.x_punchoutCustomerEmail = account["Punchout Customer Email"];
        template.allowPunchoutShopping = account["Punchout"]?.toLowerCase() || false;
        template.x_customerType = account["McNeilus Customer Type"];
        template.x_fleetNameJDE = account["Fleet Name (JDE)"];
        template.x_eightyByTwenty = account["80/20"];

        if (account["Site Name"].toLowerCase().includes("both")) {
            template.siteOrganizationProperties[0].site.siteId = sites["Refuse"].id;
            template.siteOrganizationProperties[0].properties.contract.displayName = account["Contract Name"];
            template.siteOrganizationProperties[0].properties.contract.priceListGroup.id = account["Price Group"];
            template.siteOrganizationProperties[0].properties.contract.catalog.id = sites["Refuse"].catalogId;

            template.siteOrganizationProperties[1].site.siteId = sites["Mixer"].id;
            template.siteOrganizationProperties[1].properties.contract.displayName = account["Contract Name"];
            template.siteOrganizationProperties[1].properties.contract.priceListGroup.id = account["Price Group"];
            template.siteOrganizationProperties[1].properties.contract.catalog.id = sites["Mixer"].catalogId;

        } else {
            template.siteOrganizationProperties[0].site.siteId = sites[account["Site Name"]].id;
            template.siteOrganizationProperties[0].properties.contract.displayName = account["Contract Name"];
            template.siteOrganizationProperties[0].properties.contract.priceListGroup.id = account["Price Group"];
            template.siteOrganizationProperties[0].properties.contract.catalog.id = sites[account["Catalog"]].catalogId;
        }

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

        // Here we commented on the shipping address because we don't want that.

        // template.secondaryAddresses[1].companyName = account["Billing Address Company Name"];
        // template.secondaryAddresses[1].address1 = account["Billing Address Line 1"];
        // template.secondaryAddresses[1].address2 = account["Billing Address Line 2"] ?? null;
        // template.secondaryAddresses[1].address3 = account["Billing Address Line 3"] ?? null;
        // template.secondaryAddresses[1].city = account["Billing Address City"] ?? null;
        // template.secondaryAddresses[1].state = countryState ? countryState : account["Billing Address State"] + " needToUpdate";
        // template.secondaryAddresses[1].postalCode = account["Billing Address Zip"];
        // template.secondaryAddresses[1].country = account["Billing Address Country"];
        // template.secondaryAddresses[1].address.isDefaultBillingAddress = false;
        // template.secondaryAddresses[1].address.isDefaultShippingAddress = true;
        // template.secondaryAddresses[1].addressType = "Shipping";

        // Pushing this data into organization
        finalData.organization[index] = template;
    });

    // Deleting unwanted (these are not mandatory) fields from the data
    finalData.organization.forEach(element => {
        delete element.siteOrganizationProperties[0].properties.contract.repositoryId;
        delete element.siteOrganizationProperties[0].properties.contract.creationDate;

        if (element.siteOrganizationProperties[1]?.site?.siteId) {
            delete element.siteOrganizationProperties[1]?.properties.contract.repositoryId;
            delete element.siteOrganizationProperties[1]?.properties.contract.creationDate;
        }


        delete element.secondaryAddresses[0].address.id
        element.secondaryAddresses[1]?.address?.companyName && delete element.secondaryAddresses[1].address.id;
        // Removing second site properties because we don't have a data for it
        !element.siteOrganizationProperties[1]?.site?.siteId && delete element.siteOrganizationProperties.pop();
        // Removing last element from array (that is shipping address)
        !element.secondaryAddresses[1]?.address?.companyName && element.secondaryAddresses.pop();
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
        delete element.useAllShippingMethodsFromSite;
        delete element.derivedTaxExemptionCode;
        delete element.derivedAllowPunchoutShopping;
        delete element.derivedVatReferenceNumber;
        delete element.punchoutUserId;
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

    // Saving these accounts' data into a new file
    const outputFile = "./data/accountsV2-New.json";
    fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 3));

} catch (error) {
    colorLog.error(error) && logger.error(error);
}
