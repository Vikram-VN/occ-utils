Account Deactivated Template Package.
=====================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.sitename (string)
  data.siteNames (string)
  data.firstName (string)
  data.email (array) ->
    items (string)
  data.organization (object) ->
    name (string)
    logoUrl (string)

  data.sites (array) ->
    items (object) ->
      name (string)
      url (string)
