Role Assigned Template Package.
===============================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.sitename (string)
  data.firstName (string)
  data.email (string)
  data.siteNames (string)
  data.organization (object) ->
    name (string)
    logoUrl (string)

  data.roles (string)
  data.removedRoles (string)
  data.combinedRoleChangesMap (object) ->
    rolesChangedPerOrganization (array) ->
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
            added (string)
            removed (string)


