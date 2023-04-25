const fs = require("fs");

// Reading data from the exported accounts
const prd_accounts = JSON.parse(fs.readFileSync('./data/AccountsV2_PRD.json')).organization;
const accounts = JSON.parse(fs.readFileSync('./data/allOrganizationsData.json')).organization;

// prd_accounts.forEach(ac=> {
//     const accountAvailable = accounts.find(item => item.name === ac.name);
//     if(!accountAvailable && !ac.name.includes('@')){
//         console.log(ac.name, '\n\r');
//     }
// });

accounts.forEach(ac=> {;
    if(!ac.secondaryAddresses[0].address.postalCode){
        console.log("postalCode missing: ", ac.name, '\n\r');
    }

    if(!ac.secondaryAddresses[0].address.state){
        console.log("state missing: ", ac.name, '\n\r');
    }

    if(!ac.secondaryAddresses[0].address.address1){
        console.log("address1 missing: ", ac.name, '\n\r');
    }
});