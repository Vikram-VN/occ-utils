New Organization Request Template Package.
==========================================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.firstName (string)
  data.orgRequestsCount (int)
  data.lastJobRunTime (string)
  data.currentTime (string)
  data.adminURL (string)
  data.organizationRequests (array) ->
    items (object) ->
      id (string)
      company (string)
      profile (string)
      daytimeTelephoneNumber (string)
      email (string)
      relatedOrganizationName (string)
      site (string)
      siteLocation (string)
      createdTime (string)
      createdBy (string)
