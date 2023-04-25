const fs = require("fs");
let State = require('country-state-city').State;

// Reading data from the exported accounts
const failedAccounts = JSON.parse(fs.readFileSync('./data/failedAccounts.json'));
const accounts = JSON.parse(fs.readFileSync('./data/allOrganizationsData.json'));


// const finalData = { ...accounts };
const finalData = { organization: [] };


// Iterating accounts to map the fields
failedAccounts.forEach((account) => {
    const failedAccount = accounts.organization.find((element) => {
        return element.name === account["Account Name"]
    })

    const reasons = ["Missing postal code", "Missing State", "Invalid pricegroup"];
    const reason = reasons.indexOf(reasons.find(reason => account["Issue Details"].includes(reason)));

    if (failedAccount) {
        switch (reason) {
            case 0:
                failedAccount.secondaryAddresses[0].address.postalCode = account["Recommended Action from business"];
                break;
            case 1:
                const countryState = State.getStatesOfCountry(failedAccount.secondaryAddresses[0].address.country).find((state) => {
                    return state.name === account["Recommended Action from business"];
                })?.isoCode;
                failedAccount.secondaryAddresses[0].address.state = countryState;
                break;
            case 2:
                failedAccount.siteOrganizationProperties[0].properties.contract.priceListGroup.id = account["Recommended Action from business"];
                break;
            default:
                break;
        }
        finalData.organization.push(failedAccount);
    }

});

finalData.organization = [...new Set(finalData.organization)];

console.log("Totoal records are: ", finalData.organization.length);

// saving this accounts data into a new file
fs.writeFileSync("./data/failedAccounts--All-Orgs.json", JSON.stringify(finalData, null, 3));
