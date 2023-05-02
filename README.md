# Accounts and Contacts Import


* To run this script, [NodeJS](https://nodejs.org/en/download) must be installed on your system.


* First, we have to install necessary packages by running ```npm install``` or ```yarn install```.

* If yarn is not found, then please install it by running ```npm install yarn``` command.


## Accounts Import


* Make sure you added the accounts` CSV or XLS sheet into the data` folder.


* After that, run 'yarn convert' and a new json file will be created in the 'data' folder.


* Make sure you gave proper file names.


* Open the accounts folder, and under that folder, open [accountsMapping.js](./accounts/accountsMapping.js) and change the `input` and `output` file paths.


* After that, run ```yarn accounts``` to start accounts mapping.


* Get that JSON file from the data folder and start uploading it to the OCC server.

## Contacts Import 

* Once again, make sure you added the Contacts(Profiles) CSV or XLS sheet into the Data folder.

* Do the modification for input and output files in [xlsToJson.js](./xlsToJson.js)

* After that, we must run ```yarn convert```, and a new json file will be created in the 'data' folder.


* Make sure you gave proper file names.

* Open the contacts folder, and under that folder, open [contactsMapping.js](./contacts/contactsMapping.js) and change the `input` and `output` file paths.

* Also add the exported accounts file.

* After that, run ```yarn contacts```.


* Get that JSON file from the data folder and start uploading it to the OCC server.