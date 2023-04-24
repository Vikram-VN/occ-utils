const node_xj = require("xls-to-json");

node_xj(
	{
		input: "./data/accountsV2.xlsx", // input xls
		output: "./data/accountsV2.json", // output json
		sheet: "Non-Punchout Refuse", // specific sheet name
		// rowsToSkip: 5, // number of rows to skip at the top of the sheet; defaults to 0
		allowEmptyKey: true, // avoids empty keys in the output, example: {"": "something"}; default: true
	},
	function (err, result) {
		if (err) {
			console.error(err);
		} else {
			console.log(result);
		}
	}
);

// command to run
// node xlsToJson.js