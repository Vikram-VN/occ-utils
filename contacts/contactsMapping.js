const fs = require("fs");
const { colorLog: color, contactsLogger: logger } = require("../logs/colorLog");

// Used to print console logs with different colors based on the output
const colorLog = color();

try {
    // The fs module enables interacting with the file system in a way modeled on standard POSIX functions
    // Reading data from the accounts and contacts
    const accounts = JSON.parse(fs.readFileSync('./data/AccountsV2_DEV.json')).organization; // Exported accounts
    const contacts = JSON.parse(fs.readFileSync('./data/accountsV2.json')); // Xls to json converted data

    // Temporarily storing data here, later on this will be saved into json file
    const finalData = { user: [] };

    // Iterating contacts to do field mapping
    contacts.forEach((contact, index) => {
        // Loading contacts template with all required fields, So it will be easy now to do mapping
        const template = JSON.parse(fs.readFileSync('./contacts/ContactsTemplate.json'));

        // Trying to get a valid organization ID for the current contact 
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

    finalData.user.length > 0 ?
        colorLog.success("Mapping for contacts is completed.\n Please check 'data' folder with a name 'Profiles.json' to see the data.") && logger.info(finalData) :
        colorLog.info("Something went wrong with the input and output data, please check") && logger.error(finalData);

    // Saving the data into json file
    fs.writeFileSync("./data/Profiles.json", JSON.stringify(finalData, null, 3));

} catch (error) {
    colorLog.error(error) && logger.error(error);
}
