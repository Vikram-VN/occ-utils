const fs = require("fs");
//The fs module enables interacting with the file system in a way modeled on standard POSIX functions

// Reading data from the accounts and contacts
const accounts = JSON.parse(fs.readFileSync('../data/AccountsV2_DEV.json')).organization; // Exported accounts
const contacts = JSON.parse(fs.readFileSync('../data/accountsV2.json')); // Xls to json converted data

// Temporarily storing data here, later on this will be saved into json file
const finalData = { user: [] };

// Iterating contacts to do fields mapping
contacts.forEach((contact, index) => {
    // Loading contacts template with all required fields, So it will be easy now to do mapping
    const template = JSON.parse(fs.readFileSync('./ContactsTemplate.json'));

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


// Saving the data into json file
fs.writeFileSync("../data/Profiles.json", JSON.stringify(finalData, null, 3));