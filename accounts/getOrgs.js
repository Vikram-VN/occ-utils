const axios = require('axios').default;
const fs = require('fs');

const httpCall = async (orgName) => {
    try {
        const response = await axios.request(
            {
                url: `https://p11281411c1prd-admin.occa.ocs.oraclecloud.com/ccadminui/v1/organizations?fields=totalResults,offset,limit,items.id,items.organizationLogoURL,items.name,items.parentOrganization.name,items.parentOrganization.repositoryId,items.ancestorOrganizations,items.allMembersCount&allMembersCount=true&useAdvancedQParser=true&expand=basic&limit=40&sort=name:asc&q=(name co "${orgName}")`,
                method: 'get',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImprdSI6InAxMTI4MTQxMWMxUFJEIiwia2lkIjoiMCIsIng1YyI6bnVsbCwieDV1IjoiaHR0cHM6Ly9wMTEyODE0MTFjMXByZC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NhZG1pbi92MS90ZW5hbnRDZXJ0Q2hhaW4ifQ==.eyJpYXQiOjE2ODMwOTQwNjcsImV4cCI6MTY4MzA5NzY2Nywic3ViIjoidmlrcmFtLm5hcmF5YW5hcHBhQGFwZXhpdC5jb20iLCJhdWQiOiJhZG1pblVJIiwiY29tLm9yYWNsZS5hdGcuY2xvdWQuY29tbWVyY2Uucm9sZXMiOlsiYWRtaW5Sb2xlIl0sIm9jY3MuYWRtaW4ucm9sZXMiOlsiYWRtaW5Sb2xlIl0sImlzcyI6Imh0dHBzOi8vcDExMjgxNDExYzFwcmQtYWRtaW4ub2NjYS5vY3Mub3JhY2xlY2xvdWQuY29tL29jY3MtYWRtaW4iLCJvY2NzLmFkbWluLmxvY2FsZSI6ImVuX1VTIiwib2Njcy5hZG1pbi50eiI6bnVsbCwib2Njcy5hZG1pbi50ZW5hbnRUeiI6IkFtZXJpY2EvQ2hpY2FnbyIsIm9jY3MuYWRtaW4ua2VlcEFsaXZlVVJMIjoiaHR0cHM6Ly9wMTEyODE0MTFjMXByZC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20va2VlcGFsaXZlIiwib2Njcy5hZG1pbi50b2tlblJlZnJlc2hVUkwiOiJodHRwczovL3AxMTI4MTQxMWMxcHJkLWFkbWluLm9jY2Eub2NzLm9yYWNsZWNsb3VkLmNvbS9jY2FkbWluL3YxL3Nzb1Rva2Vucy9yZWZyZXNoIiwib2Njcy5hZG1pbi52ZXJzaW9uIjoiMjMuMS4xIiwib2Njcy5hZG1pbi5idWlsZCI6ImplbmtpbnMtQXNzZW1ibGVfQ2xvdWRfQ29tbWVyY2VfRUFSc18tbWFzdGVyLTI3MSIsIm9jY3MuYWRtaW4uZW1haWwiOiJ2aWtyYW0ubmFyYXlhbmFwcGFAYXBleGl0LmNvbSIsIm9jY3MuYWRtaW4ucHJvZmlsZUlkIjoiaXVzZXI0ODg2ODM4Iiwib2Njcy5hZ2VudC5vYm8iOm51bGwsIm9jY3MuYWRtaW4uZmlyc3ROYW1lIjoiVmlrcmFtIiwib2Njcy5hZG1pbi5sYXN0TmFtZSI6Ik5hcmF5YW5hcHBhIiwib2Njcy5hZG1pbi5wdW5jaG91dFVzZXIiOmZhbHNlLCJzdWJfdHlwZSI6bnVsbCwic2NvcGUiOm51bGx9.FiJo3OqC6iXlJzLrVRCeO+PecgIck18RxkJ1ue3u9MAay9t1oXGBnJhGINUiZEcOmFwX2h6qQa0cjkL39CQTOPJpcsqUvbo+2O5A6l6cUT/o2NFmF4yJBiyik/7tLNSdCReGeYxIaSloSUb9UZT3Bl4BaYuqiQ/nYlzmSN2gKHtfFDQufdGU6cpqmeufOS/BAawHmS7TCp9MBVgRdYYhdTi4oLSd10RQJNtGgaE1bJ3dEzm3k9dtuMANFwM9CelendqAjtnrtr9r845AvqrrtrqpEuEOIooGmgCFODsvRVLv/4aK/L7+pQejKQQxavYuQYejVozBAFtwdjQ2joFWfw==`
                }
            }
        );
        if (response.data?.items[0]?.name) {
            console.log("Org Found: ", orgName, "\r");
            fs.appendFileSync('./acs-found.log', orgName + "\r");
        } else {
            console.log("Org Not Found: ", orgName, "\r");
            fs.appendFileSync('./acs-not-found.log', orgName + "\r");
        }
    } catch (err) {

    }

}

const list = JSON.parse(fs.readFileSync('./data/newAccounts-Latest.json')).organization;
// const acs = JSON.parse(fs.readFileSync('./data/AccountsV2_PRD.json')).organization;

// acs.forEach((ac) => {
//     const checkAc = list.find((item) => {
//         return item.name === ac.name
//     });

//     if (checkAc?.name) {
//         // console.log('Found: ', ac.name);
//     } else {
//         if (!ac.name.includes('@')) {
//             console.log('Not Found: ', ac.name);
//         }
//     }
// })

[...new Set(list)].forEach(async (org) => {
    await httpCall(org.name);
})

// console.log([...new Set(list.split(`
// `))].length)