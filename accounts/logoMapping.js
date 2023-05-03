const fs = require("fs");

const accountsData = JSON.parse(fs.readFileSync("./data/AccountsV2.json", { encoding: "utf-8" }));

accountsData.organization.map(organization => {
    // const company = organization.secondaryAddresses[0]?.address.companyName;
    // switch (company) {
    //     case "OLDCASTLE":
    //         organization.organizationLogo = "/general/Oldcastle.png";
    //         break;
    //     case "WM":
    //         organization.organizationLogo = "/general/WM.png";
    //         break;
    //     case "WASTE CONNECTIONS":
    //         organization.organizationLogo = "/general/Waste Connections Logo.png";
    //         break;
    //     case "REPUBLIC SERVICES":
    //         organization.organizationLogo = "/general/Republic_Services.png";
    //         break;
    //     default:
    //         console.log("Address not found")
    // }

    const emailID = organization.x_punchoutCustomerEmail || organization.members[0]?.email || "";

    console.log('Updating logo for -->', emailID, "\r\n");
    if (emailID.includes("austin.farris@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Rumpke.png";
    } else if (emailID.includes("cpalachuk@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Republic Logo.jpg";
    } else if (emailID.includes("david.duffin@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Jack_B_Parson_Horizontal_Color_Screen_EPS.png";
    } else if (emailID.includes("dfalks@wm.com.tst")) {
        organization.organizationLogo = "/general/WM.png";
    } else if (emailID.includes("dsmith14b04d@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Republic Logo.jpg";
    } else if (emailID.includes("esudol@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Desert.jpg";
    } else if (emailID.includes("justin.wilks@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Oldcastle.png";
    } else if (emailID.includes("mikeol@yopmail.com.tst")) {
        organization.organizationLogo = "/general/El Paso Disposal logo.jpg";
    } else if (emailID.includes("srubel@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Republic Logo.jpg";
    } else if (emailID.includes("trockey@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Republic Logo.jpg";
    } else if (emailID.includes("tspiker@yopmail.com.tst")) {
        organization.organizationLogo = "/general/Republic Logo.jpg";
    } else {
        organization.organizationLogo = null;
    }

});


fs.writeFileSync("./data/AccountsV2_New.json", JSON.stringify(accountsData, null, 4), { encoding: "utf-8" });
