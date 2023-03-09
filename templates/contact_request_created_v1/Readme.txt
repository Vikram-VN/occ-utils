New Contact Request Template Package.
=====================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.firstName (string)
  data.orgRequestsCount (int)
  data.lastJobRunTime (string)
  data.currentTime (string)
  data.adminURL (string)
  data.profileRequests (array) ->
    items (object) ->
      id (string)
      profile (string)
      email (string)
      site (string)
      siteLocation (string)
      createdTime (string)
      createdBy (string)
      requestedOrganizationId (string)
      requestedOrganizationName (string)
