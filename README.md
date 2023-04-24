# Accounts and Contacts Import


* To run this script, NodeJS (https://nodejs.org/en/download) must be installed on your system.


* First, we have to install `node_modules` by running `npm install.


## Accounts Import


* Make sure you added the accounts` CSV or XLS sheet into the data` folder.


* After that, run 'node xlsToJson.js' and a new json file will be created in the 'data' folder.


* Make sure you gave proper file names.


* Open the accounts folder, and under that folder, open `accountsMapping.js` and change the `input` and `output` file paths.


* After that, run `cd accounts` and `node accountsMapping.js.


* Get that JSON file from the data folder and start uploading it to the OCC server.

## Contacts Import 

* Once again, make sure you added the Contacts(Profiles) CSV or XLS sheet into the Data folder.


* After that, we must run `node xlsToJson.js`, and a new json file will be created in the 'data' folder.


* Make sure you gave proper file names.

* Open the contacts folder, and under that folder, open `contactsMapping.js` and change the `input` and `output` file paths.

* Also add the exported accounts file.

* After that, run `cd accounts, or if you're in the accounts` folder, then run `cd../contacts` and `node accountsMapping.js.


* Get that JSON file from the data folder and start uploading it to the OCC server.