const fs = require("fs");

const dataTypes = {
  array: {},
  object: {},
  items: [{}],
  null: null,
  integer: 0,
  number: 0,
  double: 0.0,
  boolean: false,
  string: ""
}

const processData = (json, data, filtered = false, prevKey) => {
  let payload;
  if (!filtered) {
    // Converting data into array list regex
    payload = data.split(/[()]/gi).filter(data => data.trim());
  } else {
    // Ignoring first regex because it is 2nd time loop, so need to do split.
    payload = data.map(data => data.replace("->", "").trim());
  }
  if (payload.length >= 2) {
    const dataType = payload[1].trim();
    const key = payload[0].trim();
    const value = dataTypes[key.includes("items") ? "items" : dataType];
    switch (dataType) {
      case "string":
      case "boolean":
      case "double":
      case "number":
      case "null":
      case "integer":
        if (!prevKey) {
          // This will be used to add json object key values to the main object
          json[key] = value;
        } else {
          // This used to add key values pairs to items list
          json[0][key] = value;
        }
        // Again iterating to set key values for object
        processData(json, payload.slice(2), true);
        break;
      default:
        // Removing 2 items from the array list (because we already used those)
        const newPayload = payload.slice(2);
        if (key.includes("items")) {
          processData(json[key] = value, newPayload, true, key);
        } else {
          processData(json[key] = value, newPayload, true);
        }
    }
  }
}

const processEmailTemplate = data => {
  const newData = data.split("data.").slice(1);
  const json = {};
  // Converting string object into array list and iterating using map method
  newData.map(data => processData(json, data.replace(/\n/g, "")));
  return json; // Add return statement to return the processed JSON object
}

const jsonObject = processEmailTemplate(data);