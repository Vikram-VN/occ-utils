// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
const data = `Abandoned Cart Template Package.
================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.locale (string)
  data.storefrontUrl (string)
  data.sitename (string)
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
  
// const replaceData = data.replace(/data./gi, "");
// const replaceArrow = replaceData.replace(/ ->/gi, ":");
// const replaceParenthesis = replaceArrow.replace(/[()]/gi, "");
// const replaceString = replaceParenthesis.replace(/ string/gi, ": null,");
// const replaceBoolean = replaceString.replace(/ boolean/gi, ": true,");

const processKey = (obj, props) => {
  const {keys, value} = props;

  const currentKey = keys[0];

  // if there's only one key process and return
  if (keys.length === 1) {
    if (currentKey === '') {
      // if blank then it's an array so push value into it
      obj.push(value);
    } else {
      // assign value to object property or array position
      obj[currentKey] = value;
    }
  } else {
    const currentKeyNotDefined = obj[currentKey] === undefined;
    const currentKeyNotDefinedOrNotArray = currentKeyNotDefined || !Array.isArray(obj[currentKey]);
    const currentKeyNotDefinedOrNotObject = currentKeyNotDefined || !isObject(obj[currentKey]);
    const nextKey = keys[1];

    if (nextKey === '') {
      if (currentKeyNotDefinedOrNotArray) {
        // create an array for array values
        obj[currentKey] = [];
      }
    } else if (Number.isInteger(parseFloat(nextKey))) {
      // is a digit i.e. array index
      if (currentKeyNotDefinedOrNotArray) {
        // create an array for array values
        obj[currentKey] = [];
      }
    } else if (currentKeyNotDefinedOrNotObject) {
      // create an object
      obj[currentKey] = {};
    }

    // call process key again
    const lastKey = keys.slice(1);
    processKey(obj[currentKey], {keys: lastKey, value});
  }
};

console.log(replaceBoolean)
