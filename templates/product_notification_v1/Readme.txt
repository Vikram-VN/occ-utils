Notifty Me Template Package.
============================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.storefrontUrl (string)
  data.sitename (string)
  data.product (object) ->
    title (string)
    description (string)
    longDescription (string)
    productId (string)
    brand (string)
    productTaxCode (string)
    price (string)
    listPrice (string)
    onSale (string)
    salePrice (string)
    priceRange (string)
    priceMax (string)
    priceMin (string)
    shippingSurchargeValue (string)
    notForIndividualSale (string)
    arrivalDate (string)
    height (string)
    length (string)
    width (string)
    weight (string)
    orderLimit (string)
    excludefromXMLSitemap (string)
    skuConfigurable (string)
    skuActive (string)
    productActive (string)
    catRefId (string)
    imageLocation (string)
    location (string)
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

