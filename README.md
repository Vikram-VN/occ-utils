# Accounts and Contacts Import


* To run this script, [NodeJS](https://nodejs.org/en/download) must be installed on your system.

* Also, make sure you have installed `yarn`, to check whether it is installed or not, we can run the command `yarn -v`. If yarn is installed, it will show the yarn version, or else it will give an error.

* To install yarn, we must use the ```npm install -g yarn``` command.

* After that, we have to install the necessary packages by running ```yarn install```.


## Accounts Import


* Make sure you added the accounts` CSV or XLS sheet into the data` folder.


* After that, run 'yarn convert' and a new json file will be created in the 'data' folder.


* Make sure you gave proper file names.


* Open the accounts folder, and under that folder, open [accountsMapping.js](./accounts/accountsMapping.js) and change the`accounts`, `contacts`, and `outputFile` file paths.


* After that, run ```yarn accounts``` to start accounts mapping.


* Get that JSON file from the data folder and start uploading it to the OCC server.

## Contacts Import 

* I hope you have already converted the Excel sheet data into JSON.

* The next step is to open the contacts folder, and under that folder, open [contactsMapping.js](./contacts/contactsMapping.js) and change the `accounts`, `contacts`, and `outputFile` file paths.

* Along with that, you have to export accounts from OCC server, and add it in under the data folder.

* After that, run ```yarn contacts```.


* Get that JSON file from the data folder and start uploading it to the OCC server.


## Notes
* For punchout users, we have to include one field called `Punchout` with a value `true`.
* For Non-puchout users, there is no need to add this field.
* If we want to include any new fields for accounts, we have to add those fields under [accountsMapping.js](./accounts/accountsMapping.js) and this will apply for [contactsMapping.js](./contacts/contactsMapping.js) as well.