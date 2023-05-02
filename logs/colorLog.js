const log = require('node-color-log');
const winston = require('winston');

// The common color log function does nothing except color the terminal output.
const colorLog = () => {
    return {
        success: msg => log.color("green").log(`\n Time# ${new Date().toISOString()}: \n ${msg} \n\n`),
        info: msg => log.color("cyan").log(`\n Time# ${new Date().toISOString()}: \n ${msg} \n\n`),
        warning: msg => log.color("magenta").log(`\n Time# ${new Date().toISOString()}: \n ${msg} \n\n`),
        error: msg => log.color("red").log(`\n Time# ${new Date().toISOString()}: \n ${msg} \n\n`),
    }
}

// Saving the logs for reference
const logger = winston.createLogger({
	transports: [
		new winston.transports.File({ filename: './logs/excel-json/error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/excel-json/info.log', level: 'info' }),
	],
});

// Accounts log function
const accountsLogger = winston.createLogger({
	transports: [
		new winston.transports.File({ filename: './logs/accounts/error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/accounts/info.log', level: 'info' }),
	],
});

// Contacts log function
const contactsLogger = winston.createLogger({
	transports: [
		new winston.transports.File({ filename: './logs/contacts/error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/contacts/info.log', level: 'info' }),
	],
});


module.exports = {colorLog, logger, accountsLogger, contactsLogger};