Organization Assigned Template Package.
=======================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.sitename (string)
  data.firstName (string)
  data.email (string)
  data.siteNames (string)
  data.organization (object) ->
    name (string)
    logoUrl (string)

  data.organizationRemoved (object) ->
    name (string)
    logoUrl (string)

  data.isDefaultOrganization (boolean)
  data.isLastOrganization (boolean)
  data.roles (string)
  data.password (string)
  data.resetPasswordLink (string)
  data.combinedOrgChangesMap (object) ->
    newOrganizationAndRoles (array) ->
      items (object) ->
        organization (object) ->
          name (string)
          default (boolean)
          sites (array) ->
            items (object) ->
              name (string)
              url (string)


        roles (array) ->
          items (object) ->
            name (string)


    removedOrganizations (array) ->
      items (object) ->
        organization (object) ->
          name (string)
          default (boolean)
          sites (array) ->
            items (object) ->
              name (string)
              url (string)



