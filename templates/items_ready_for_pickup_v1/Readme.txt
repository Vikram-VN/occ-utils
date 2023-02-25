Items Ready For Pickup Template Package.
========================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.locale (string)
  data.storefrontUrl (string)
  data.sitename (string)
  data.shopper (object) ->
    firstName (string)
    lastName (string)

  data.orderId (string)
  data.orderLocation (string)
  data.orderDate (string)
  data.orderTime (number)
  data.paymentMethods (string)
  data.shippingGroup (object) ->
    dynamicProperties (array) ->
      items (object) ->
        propertyId (string)
        propertyLabel (string)
        propertyType (string)
        propertyValue (string)

    storeAddress (object) ->
      name (string)
      address1 (string)
      address2 (string)
      address3 (string)
      city (string)
      county (string)
      stateAddress (string)
      postalCode (string)
      country (string)
      phoneNumber (string)

    shippingDate (string)
    itemsShipped (array) ->
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

        variants (array) ->
          items (object) ->
            optionName (string)
            optionValue (string)

        orderItems (array) ->
          items (object) ->
            addOnItem (boolean)
            imageLocation (string)
            title (string)
            location (string)
            productId (string)
            catRefId (string)
            quantity (integer)
            preOrderedQuantity (integer)
            backOrderedQuantity (integer)
            availabilityDate (string)


    subtotal (string)
    discount (string)
    tax (string)
    shipping (string)
    total (string)
    primaryCurrencyTotal (string)
    secondaryCurrencyTotal (string)
    firstName (string)
    lastName (string)
    phoneNumber (string)

  data.dynamicProperties (array) ->
    items (object) ->
      propertyId (string)
      propertyLabel (string)
      propertyType (string)
      propertyValue (string)

  data.currencyCode (string)
  data.secondaryCurrencyCode (string)
  data.exchangeRate (double)
  data.orderHasMixedCurrencies (boolean)
  data.payTaxInSecondaryCurrency (boolean)
  data.payShippingInSecondaryCurrency (boolean)
  data.organization (object) ->
    name (string)
    logoUrl (string)
    taxReferenceNumber (string)
    vatReferenceNumber (string)
    taxExemptionCode (string)

  data.payments (array) ->
    items (object) ->
      paymentType (string)
      poNumber (string)
      paymentMethod (string)
      currencyCode (string)
      amount (number)
      amountAuthorized (number)
      amountCredited (number)
      amountDebited (number)
      state (string)
      billingAddress (object) ->
        firstName (string)
        lastName (string)
        prefix (string)
        suffix (string)
        address1 (string)
        address2 (string)
        address3 (string)
        city (string)
        county (string)
        state (string)
        postalCode (string)
        country (string)
        dynamicProperties (array) ->
          items (object) ->
            propertyId (string)
            propertyLabel (string)
            propertyType (string)
            propertyValue (string)


      cardNumber (string)
      variation (string)
      giftCardNumber (string)
      paymentSubtype (string)
