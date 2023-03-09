Agent Cancel Inflight Order Template Package.
=============================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.storefrontUrl (string)
  data.sitename (string)
  data.firstName (string)
  data.locale (string)
  data.email (string)
  data.orderDetails (object) ->
    id (string)
    creationDate (string)
    creationTime (string)
    orderItems (array) ->
      items (object) ->
        imageLocation (string)
        title (string)
        location (string)
        quantity (integer)
        productId (string)
        catRefId (string)
        preOrderedQuantity (integer)
        backOrderedQuantity (integer)
        availabilityDate (string)
        price (string)
        dynamicProperties (array) ->
          items (object) ->
            propertyId (string)
            propertyLabel (string)
            propertyType (string)
            propertyValue (string)

        externalPrice (string)
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
            quantity (integer)
            price (string)
            productId (string)
            catRefId (string)
            orderItems (null)
            preOrderedQuantity (integer)
            backOrderedQuantity (integer)
            availabilityDate (string)


    priceInfo (object) ->
      total (string)
      discount (string)
      shipping (string)
      currencyCode (string)
      tax (string)
      subtotal (string)
      primaryCurrencyTotal (string)
      secondaryCurrencyTotal (string)

    shippingMethod (object) ->
      value (string)
      cost (number)

    shippingAddress (object) ->
      firstName (string)
      middleName (string)
      lastName (string)
      state (string)
      address1 (string)
      address2 (string)
      address3 (string)
      companyName (string)
      suffix (string)
      country (string)
      city (string)
      faxNumber (string)
      postalCode (string)
      phoneNumber (string)
      email (string)
      county (string)
      prefix (string)
      jobTitle (string)

    shippingGroups (array) ->
      items (object) ->
        shippingMethods (string)
        shippingAddress (object) ->
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


        shippingItems (array) ->
          items (object) ->
            imageLocation (string)
            title (string)
            location (string)
            quantity (integer)
            productId (string)
            catRefId (string)
            price (string)
            rawTotalPrice (string)
            externalPrice (string)
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
                quantity (integer)
                productId (string)
                catRefId (string)
                price (string)
                orderItems (null)
                preOrderedQuantity (integer)
                backOrderedQuantity (integer)
                availabilityDate (string)


        surcharge (string)
        priceInfo (object) ->
          rawTotalPrice (string)
          discount (string)
          shippingSurchargeValue (string)
          currencyCode (string)
          tax (string)
          subtotal (string)


    dynamicProperties (array) ->
      items (object) ->
        propertyId (String)
        propertyLabel (String)
        propertyType (String)
        propertyValue (String)

    currencyCode (string)
    secondaryCurrencyCode (string)
    exchangeRate (double)
    orderHasMixedCurrencies (boolean)
    payTaxInSecondaryCurrency (boolean)
    payShippingInSecondaryCurrency (boolean)
    paymentMethods (array) ->
      items (string)
    payments (array) ->
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


  data.organization (object) ->
    name (string)
    logoUrl (string)
    taxReferenceNumber (string)
    vatReferenceNumber (string)
    taxExemptionCode (string)

  data.returnRequestId (string)
  data.returnItems (array) ->
    items (object) ->
      imageLocation (string)
      title (string)
      location (string)
      quantity (integer)
      productId (string)
      catRefId (string)
      price (string)
      externalPrice (string)
      variants (array) ->
        items (object) ->
          optionName (string)
          optionValue (string)

      dynamicProperties (array) ->
        items (object) ->
          propertyId (string)
          propertyLabel (string)
          propertyType (string)
          propertyValue (string)

      orderItems (array) ->
        items (object) ->
          addOnItem (boolean)
          imageLocation (string)
          title (string)
          location (string)
          quantity (integer)
          productId (string)
          catRefId (string)
          price (string)
          orderItems (null)
          preOrderedQuantity (integer)
          backOrderedQuantity (integer)
          availabilityDate (string)

      quantityReturned (string)
      quantityReceived (string)
      quantityShipped (string)
      quantityAvailableForReturn (string)
      quantityToReceive (string)
      quantityToReturn (string)
      actualRefundAmount (string)
      suggestedRefundAmount (string)
      suggestedShippingRefund (string)
      suggestedTaxRefund (string)
      returnReason (string)
      unitPrice (string)

  data.refundInfo (object) ->
    suggestedOrderRefund (string)
    actualTaxRefund (string)
    otherRefund (string)
    suggestedTaxRefund (string)
    suggestedTotalRefund (string)
    refundDue (string)
    refundDuePrimaryCurrency (string)
    refundDueSecondaryCurrency (string)
    actualShippingRefund (string)
    returnFee (string)
    suggestedShippingRefund (string)

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

  data.currencyCode (string)
  data.secondaryCurrencyCode (string)
  data.exchangeRate (double)
  data.orderHasMixedCurrencies (boolean)
  data.payTaxInSecondaryCurrency (boolean)
  data.payShippingInSecondaryCurrency (boolean)
  data.paymentReversalInfo (array) ->
    items (object) ->
      amount (string)
      maxRefundAmount (string)
      reversalMethod (string)
      paymentGroupId (string)
      creditCardType (string)
      refundType (string)
      creditCardInfo (object) ->
        cardNumber (string)


  data.profileInfo (object) ->
    firstName (string)
    email (string)
