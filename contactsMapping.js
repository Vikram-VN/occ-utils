const fs = require("fs");
//The fs module enables interacting with the file system in a way modeled on standard POSIX functions

// Reading data from the accounts and contacts
const accounts = JSON.parse(fs.readFileSync('./data/AccountsV2.json')).organization;
const contacts = JSON.parse(fs.readFileSync('./data/accounts-mixer.json'));

// Temporarily storing data here, later on this will be saved into json file
const finalData = { user: [] };

// Iterating contacts to do fields mapping
contacts.forEach((contact, index) => {
    // Created a contacts import template with all required fields so it will be easy now to do mapping
    const template = JSON.parse(fs.readFileSync('./data/ContactsTemplate.json'));

    // Trying to get valid organization id for the current contact
    const organizationId = accounts.filter(org => {
        return org.name === contact["Account Name"]
    })[0]?.id;

    // Mapping the fields
    template.email = contact["Contact Email"];
    template.firstName = contact["Contact First Name"];
    template.lastName = contact["Contact Last Name"];
    template.x_registeredDate = new Date(contact["Contact Registered Date"]);
    template.x_phoneNumber = contact["Contact Phone Number"];
    template.parentOrganization.id = organizationId;
    template.roles[0].associations[0].relatedItemId = organizationId;
    template.roles[0].relativeTo.id = organizationId;
    template.roles[1].associations[0].relatedItemId = organizationId;
    template.roles[1].relativeTo.id = organizationId;

    // Pushing data into contacts 
    finalData.user[index] = template;
});

// Deleting unwanted fields from the data
// finalData.user.forEach(element => {
//     delete element.siteOrganizationProperties[0].properties.contract.repositoryId;
// });

// Saving the data into json file
fs.writeFileSync("./data/contacts-mixer-new.json", JSON.stringify(finalData, null, 3));