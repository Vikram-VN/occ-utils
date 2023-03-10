// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
const data = `Abandoned Cart Template Package.
================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.locale (string)
  data.storefrontUrl (string)
  data.siteName (string)
  data.firstName (string)
  data.unsubscribeLocation (string)
  data.checkoutLocation (string)
  data.organization (object) ->
    name (string)
    logoUrl (string)
    taxReferenceNumber (string)
    vatReferenceNumber (string)
    taxExemptionCode (string)

  data.products (array) ->
    items (object) ->
      imageLocation (string)
      title (string)
      location (string)
      productId (string)
      catRefId (string)
      quantity (integer)
      price (string)
      dynamicProperties (array) ->
        items (object) ->
          propertyId (string)
          propertyLabel (string)
          propertyType (string)
          propertyValue (string)

      externalPrice (string)
      actionCode (string)
      externalData (array) ->
        items (object) ->
          name (string)
          values (object) ->
            label (string)
            displayValue (string)
            value (string)

          actionCode (string)

      recurringCharge (string)
      externalRecurringCharge (number)
      externalRecurringChargeFrequency (string)
      externalRecurringChargeDuration (string)
      previousPrice (string)
      variants (array) ->
        items (object) ->
          optionName (string)
          optionValue (string)

      activationDate (string)
      deactivationDate (string)
      transactionDate (string)
      serviceId (string)
      assetKey (string)
      rootAssetKey (string)
      parentAssetKey (string)
      customerAccountId (string)
      billingAccountId (string)
      billingProfileId (string)
      serviceAccountId (string)
      orderItems (array) ->
        items (object) ->
          addOnItem (boolean)
          imageLocation (string)
          title (string)
          location (string)
          productId (string)
          catRefId (string)
          quantity (integer)
          price (string)
          orderItems (null)
          preOrderedQuantity (integer)
          backOrderedQuantity (integer)
          availabilityDate (string)
          actionCode (string)
          externalData (array) ->
            items (object) ->
              name (string)
              values (object) ->
                label (string)
                displayValue (string)
                value (string)

              actionCode (string)

          recurringCharge (string)
          activationDate (string)
          deactivationDate (string)
          transactionDate (string)
          serviceId (string)
          assetKey (string)
          rootAssetKey (string)
          parentAssetKey (string)
          customerAccountId (string)
          billingAccountId (string)
          billingProfileId (string)
          serviceAccountId (string)


  data.cartName (string)
  data.recommendations (array) ->
    items (object) ->
      title (string)
      description (string)
      longDescription (string)
      brand (string)
      location (string)
      imageLocation (string)
      listPrice (string)
      onSale (string)
      salePrice (string)
      priceRange (string)
      priceMax (string)
      priceMin (string)

  data.currencyCode (string)
  data.secondaryCurrencyCode (string)
  data.exchangeRate (double)
  data.orderHasMixedCurrencies (boolean)
  data.payTaxInSecondaryCurrency (boolean)
  data.payShippingInSecondaryCurrency (boolean)`;



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

  const listItems = ["items", "payments", "shippingAddress", "shippingMethod", "shippingPriceInfo", "storeAddress", "priceInfo"];

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
    const value = dataTypes[(listItems.includes(key) && dataType.toLowerCase() !== "string" ? "items" : dataType).toLowerCase()];
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
        if (listItems.includes(key)) {
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
console.log(JSON.stringify(jsonObject));