const XLS_JSON = require("xls-to-json");
const { colorLog: color, logger } = require("./logs/colorLog");

// Used to print console logs with different colors based on the output
const colorLog = color();

try {

	XLS_JSON(
		{
			input: "./data/accountsV2.xlsx", // input xls
			output: "./data/accountsV2.json", // output json
			sheet: "Sheet1", // specific sheet name
			// rowsToSkip: 5, // number of rows to skip at the top of the sheet; defaults to 0
			allowEmptyKey: true, // avoids empty keys in the output, example: {"": "something"}; default: true
		},
		(err, result) => {
			if (err) {
				logger.error(err);
				colorLog.error(err);
			} else {
				logger.info(result);
				colorLog.success("Successfully converted excel data into json");
			}
		}
	);

} catch (error) {
	logger.error(error);
	colorLog.error(error);
}
