const fs = require("fs");
//The fs module enables interacting with the file system in a way modeled on standard POSIX functions

const accounts = JSON.parse(fs.readFileSync('./data/AccountsV2.json')).organization;
const contacts = JSON.parse(fs.readFileSync('./data/accounts-refuse.json'));

const finalData = { user: [] };

contacts.forEach((contact, index) => {

    const template = JSON.parse(fs.readFileSync('./data/ContactsTemplate.json'));
    const organizationId = accounts.filter(org => {
        return org.name === contact["Account Name"]
    })[0]?.id;

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
    finalData.user[index] = template;
});

// Deleting unwanted fields from the data
// finalData.user.forEach(element => {
//     delete element.siteOrganizationProperties[0].properties.contract.repositoryId;
// });


fs.writeFileSync("./data/contacts-refuse-new.json", JSON.stringify(finalData, null, 3));