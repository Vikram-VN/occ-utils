const fs = require("fs");

const folders = fs.readdirSync("./templates", { encoding: "utf-8" });

const processData = (json, data, filtered = false, prevKey) => {
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

  const listItems = ["items", "payments", "shippingAddress", "shippingMethod", "shippingPriceInfo", "storeAddress", "priceInfo", "dynamicProperties"];

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
    const find = listItems.includes(key) && dataType.toLowerCase() !== "string" ? "items" : dataType.toLowerCase();
    const value = dataTypes[find];
    const newPayload = payload.slice(2);
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
          processData(json, newPayload, true);
        } else {
          // This used to add key values pairs to items list
          json[0][key] = value;
          processData(json, newPayload, true, key);
        }
        // Again iterating to set key values for object
        break;
      default:
        // Removing 2 items from the array list (because we already used those)
        if (listItems.includes(key) && prevKey) {
          processData(json[0][key] = value, newPayload, true, key);
        } else if (listItems.includes(key)) {
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
folders.forEach((folder, index) => {
  const data = fs.readFileSync(`./templates/${folder}/Readme.txt`, { encoding: "utf-8" });
  try {
    if (index === 10) {
      console.log('ok');
    }
    const jsonObject = processEmailTemplate(data);
    console.log(index + ") " + folder, '\r\n');
    fs.writeFileSync(`./json/${folder}.json`, JSON.stringify(jsonObject, null, 4), { encoding: "utf-8" })
  } catch (e) {
    console.log(e)
  }

})
