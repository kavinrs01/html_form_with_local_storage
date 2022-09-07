let keyvalue = [
  "name",
  "email",
  "phonenumber",
  "website",
  "contactname",
  "contactphonenumber",
  "contactemail",
  "notes",
  "typeofbusiness",
  "categry",
  "commissionpercentage",
  "activefrom",
  "criticalaccount",
  "paymentoption",
  "logoImage",
];
let formvalues = [];
let selectedIndex;
let url;
window.onload = onLoadTable;

function submit() {
  let merchantdetails = {
    name: document.getElementById("name").value,
    email: gettingEmail(),
    phonenumber: document.getElementById("phonenumber").value,
    website: document.getElementById("website").value,
    contactname: document.getElementById("Contactname").value,
    contactphonenumber: document.getElementById("Contactphone").value,
    contactemail: document.getElementById("contactmail").value,
    notes: document.getElementById("notes").value,
    typeofbusiness: gettingtype(),
    categry: document.getElementById("catagery").value,
    commissionpercentage: document.getElementById("comissionpercentage").value,
    activefrom: document.getElementById("date").value,
    criticalaccount: criticalAccount(),
    paymentoption: gettingpayment(),
    logoImage: url || "https://i.stack.imgur.com/l60Hf.png",
  };
  if (
    (merchantdetails["name"] != "") &
    (merchantdetails["email"] != "") &
    (merchantdetails["phonenumber"] != "")
  ) {
    if (merchantdetails["email"].includes("@gmail.com")) {
      let localFormValue = localStorage.getItem("storedFormValues");
      if (localFormValue) {
        formvalues = [merchantdetails].concat(JSON.parse(localFormValue));
      } else {
        formvalues = [merchantdetails];
      }
      localStorage.setItem("storedFormValues", JSON.stringify(formvalues));

      // console.log(localFormValue);
      // console.log(formvalues);
      creatingtable(formvalues);
      formReset();
    } else {
      document.getElementById("email").style.border = "1px solid red";
      document.getElementById("messageForEmail").innerHTML =
        "Please fill the  proper email";
      document.getElementById("email").focus();
      return;
    }
  } else {
    if (merchantdetails["phonenumber"] == "") {
      document.getElementById("phonenumber").style.border = "1px solid red";
      document.getElementById("phonenumber").focus();
      document.getElementById("messageForNumber").innerHTML =
        "Please fill the phone number";
    }
    if (merchantdetails["email"] == "") {
      document.getElementById("email").style.border = "1px solid red";
      document.getElementById("messageForEmail").innerHTML =
        "Please fill the email";
      document.getElementById("email").focus();
    }
    if (merchantdetails["name"] == "") {
      document.getElementById("name").style.border = "1px solid red";
      document.getElementById("messageForName").innerHTML =
        "Please fill the name";
      document.getElementById("name").focus();
    }
    // alert("Some required details are empty\nplease fill and submit");
  }
}

function creatingtable(formvalues) {
  let addingtable = `<table class="table table-bordered" id="dataTable" >
  <thead>
    <th class ="tableborder">Name</th>
    <th class ="tableborder">Email</th>
    <th class ="tableborder">Phonenumber</th>
    <th class ="tableborder">Website</th>
    <th class ="tableborder">Contact Name</th>
    <th class ="tableborder">Contact Phone Number</th>
    <th class ="tableborder">Contact email</th>
    <th class ="tableborder">Notes</th>
    <th class ="tableborder">Type of Business</th>
    <th class ="tableborder">Categry</th>
    <th class ="tableborder">Commission Percentage</th>
    <th class ="tableborder">Active From</th>
    <th class ="tableborder">Critical account</th>
    <th class ="tableborder">Payment Option</th>
    <th class ="tableborder">Logo Image</th>
  </thead>`;
  let textr = ``;
  for (i = 0; i < formvalues.length; i++) {
    let text = ``;
    for (j = 0; j < keyvalue.length - 1; j++) {
      text += `<td>${setaTagForWebsite(i, j)}</td>`;
    }
    textr +=
      `<tr>` +
      text +
      `<td><a href="${formvalues[i][keyvalue[14]]
      }" target="blank"><img src=${formvalues[i][keyvalue[14]]
      } width="auto" height="50" alt="Logo"></img></a></td>` +
      `<td><button class="btn btn-success" onclick="edit(${i})">Edit</button></td>` +
      `<td><button class="btn btn-danger" onclick="deletevalue(${i})">delete</button></td>` +
      `</tr>`;
  }
  let result = addingtable + textr + `</table>`;
  document.getElementById("dataTable").innerHTML = result;
}

var x = localStorage.getItem("merchantdetails");
function criticalAccount() {
  if (document.getElementById("criticalaccount").checked == true) {
    return "yes";
  } else {
    return "no";
  }
}
function gettingEmail() {
  return document.getElementById("email").value.toLowerCase();
}

function gettingtype() {
  let idnames = ["smallbusiness", "enterpriser", "enterprenur"];
  if (
    (document.getElementById("smallbusiness").checked == false) &
    (document.getElementById("enterpriser").checked == false) &
    (document.getElementById("enterprenur").checked == false)
  ) {
    return document.getElementById("smallbusiness").value;
  } else {
    for (i = 0; i < idnames.length; i++) {
      if (document.getElementById(idnames[i]).checked == true) {
        return document.getElementById(idnames[i]).value;
      }
    }
  }
}

function gettingpayment() {
  let idnames = ["cashondelievery", "UPI", "cardpayment"];
  payment = [];
  for (i = 0; i < idnames.length; i++) {
    if (document.getElementById(idnames[i]).checked == true) {
      let x = document.getElementById(idnames[i]).value;
      payment.push(x);
    }
  }
  return payment;
}

function edit(ind) {
  selectedIndex = ind;
  document.getElementById("name").value = formvalues[ind][keyvalue[0]];
  document.getElementById("email").value = formvalues[ind][keyvalue[1]];
  document.getElementById("phonenumber").value = formvalues[ind][keyvalue[2]];
  document.getElementById("website").value = formvalues[ind][keyvalue[3]];
  document.getElementById("Contactname").value = formvalues[ind][keyvalue[4]];
  document.getElementById("Contactphone").value = formvalues[ind][keyvalue[5]];
  document.getElementById("contactmail").value = formvalues[ind][keyvalue[6]];
  document.getElementById("notes").value = formvalues[ind][keyvalue[7]];
  document.getElementById("smallbusiness").checked = inputTosmallbusiness();
  document.getElementById("enterpriser").checked = inputToenterpriser();
  document.getElementById("enterprenur").checked = inputToenterprenur();
  document.getElementById("catagery").value = formvalues[ind][keyvalue[9]];
  document.getElementById("comissionpercentage").value =
    formvalues[ind][keyvalue[10]];
  document.getElementById("date").value = formvalues[ind][keyvalue[11]];
  document.getElementById("criticalaccount").checked = inputToCritical();
  document.getElementById("cashondelievery").checked = inputTocash();
  document.getElementById("UPI").checked = inputToupi();
  document.getElementById("cardpayment").checked = inputTocard();
  document.getElementById("displayingImageInInput").innerHTML = `<img src=${formvalues[ind][keyvalue[14]]
    } width="auto" height="100"></img>`;
  document.getElementById("invisible").innerHTML = "";
  document.getElementById(
    "visibleupdate"
  ).innerHTML = `<button  class="btn btn-success" onclick="update()">Update</button>`;
}

function deletevalue(ind) {
  // console.log(ind)
  let localFormValue = localStorage.getItem("storedFormValues");
  let tempory = JSON.parse(localFormValue);

  tempory.splice(ind, 1);
  // console.log(tempory);
  // localStorage.setItem("storedFormValues", JSON.stringify(JSON.parse(tempory)));
  formvalues = tempory;
  document.getElementById("invisible").innerHTML = `<button  class="btn btn-success" onclick="submit()">Submit</button>`;
  document.getElementById("visibleupdate").innerHTML = "";

  // console.log(formvalues);
  localStorage.setItem("storedFormValues", JSON.stringify(formvalues));
  creatingtable(formvalues);
  formReset();
}

function update() {
  let localFormValue = localStorage.getItem("storedFormValues");
  let tempory = JSON.parse(localFormValue);
  let alreadyExistUrl = tempory[selectedIndex][keyvalue[14]];
  tempory[selectedIndex] = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phonenumber: document.getElementById("phonenumber").value,
    website: document.getElementById("website").value,
    contactname: document.getElementById("Contactname").value,
    contactphonenumber: document.getElementById("Contactphone").value,
    contactemail: document.getElementById("contactmail").value,
    notes: document.getElementById("notes").value,
    typeofbusiness: gettingtype(),
    categry: document.getElementById("catagery").value,
    commissionpercentage: document.getElementById("comissionpercentage").value,
    activefrom: document.getElementById("date").value,
    criticalaccount: criticalAccount(),
    paymentoption: gettingpayment(),
    logoImage: url || alreadyExistUrl,
  };
  document.getElementById("invisible").innerHTML = `<button  class="btn btn-success" onclick="submit()">Submit</button>`;
  document.getElementById("visibleupdate").innerHTML = "";
  formvalues = tempory;
  localStorage.setItem("storedFormValues", JSON.stringify(formvalues));
  creatingtable(formvalues);
  formReset();
}

function inputToCritical() {
  if (formvalues[selectedIndex][keyvalue[12]] == "yes") {
    return (document.getElementById("criticalaccount").checked = true);
  } else {
    return (document.getElementById("criticalaccount").checked = false);
  }
}

function inputTocash() {
  if (formvalues[selectedIndex][keyvalue[13]].includes("cash on delievery")) {
    return (document.getElementById("cashondelievery").checked = true);
  } else {
    return (document.getElementById("cashondelievery").checked = false);
  }
}

function inputToupi() {
  if (formvalues[selectedIndex][keyvalue[13]].includes("UPI")) {
    return (document.getElementById("UPI").checked = true);
  } else {
    return (document.getElementById("UPI").checked = false);
  }
}

function inputTocard() {
  if (formvalues[selectedIndex][keyvalue[13]].includes("card payment")) {
    return (document.getElementById("cardpayment").checked = true);
  } else {
    return (document.getElementById("cardpayment").checked = false);
  }
}

function inputTosmallbusiness() {
  if (formvalues[selectedIndex][keyvalue[8]] == "smallbusiness") {
    return (document.getElementById("criticalaccount").checked = true);
  } else {
    return (document.getElementById("criticalaccount").checked = false);
  }
}

function inputToenterpriser() {
  if (formvalues[selectedIndex][keyvalue[8]] == "Enterprise") {
    return (document.getElementById("criticalaccount").checked = true);
  } else {
    return (document.getElementById("criticalaccount").checked = false);
  }
}

function inputToenterprenur() {
  if (formvalues[selectedIndex][keyvalue[8]] == "enterprenur") {
    return (document.getElementById("criticalaccount").checked = true);
  } else {
    return (document.getElementById("criticalaccount").checked = false);
  }
}

function formReset() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phonenumber").value = "";
  document.getElementById("website").value = "";
  document.getElementById("Contactname").value = "";
  document.getElementById("Contactphone").value = "";
  document.getElementById("contactmail").value = "";
  document.getElementById("notes").value = "";
  document.getElementById("smallbusiness").checked = true;
  document.getElementById("enterpriser").checked = false;
  document.getElementById("enterprenur").checked = false;
  document.getElementById("catagery").value = "Clothes";
  document.getElementById("comissionpercentage").value = "";
  document.getElementById("date").value = "";
  document.getElementById("criticalaccount").checked = false;
  document.getElementById("cashondelievery").checked = false;
  document.getElementById("UPI").checked = false;
  document.getElementById("cardpayment").checked = false;
  document.getElementById("logo").value = "";
  document.getElementById("messageForName").innerHTML = "";
  document.getElementById("messageForEmail").innerHTML = "";
  document.getElementById("messageForNumber").innerHTML = "";
  document.getElementById("displayingImageInInput").innerHTML = "";
  url = "";
}
function loadFile(event) {
  var image = document.getElementById("logo");
  console.log(image);
  url = URL.createObjectURL(event.target.files[0]);
  document.getElementById(
    "displayingImageInInput"
  ).innerHTML = `<img src=${url} width="auto" height="100"></img>`;
  console.log(url);
}
//   document.getElementById("dataTable").addEventListener("load",onLoadTable);
function onLoadTable() {
  console.log("gerytewy");
  let localFormValue = localStorage.getItem("storedFormValues");
  console.log(localFormValue);
  let tempory = JSON.parse(localFormValue);
  formvalues = tempory;
  document.getElementById("smallbusiness").checked = true;
  if (localFormValue) {
    creatingtable(formvalues);
  } else {
    document.getElementById("dataTable").innerHTML = "";
  }
}
function removeNameMessage() {
  document.getElementById("name").style.border = "1px solid #d1d1e0";

  document.getElementById("messageForName").innerHTML = "";
}
function removeEmailMessage() {
  document.getElementById("email").style.border = "1px solid #d1d1e0";
  document.getElementById("messageForEmail").innerHTML = "";
}
function removePhoneNumberMessage() {
  document.getElementById("phonenumber").style.border = "1px solid #d1d1e0";
  document.getElementById("messageForNumber").innerHTML = "";
}
function setaTagForWebsite(i, j) {
  if (keyvalue[j] == "website") {
    return `<a href="${formvalues[i][keyvalue[j]]}" target="blank"> ${formvalues[i][keyvalue[j]]}</a>`;
  }
  return formvalues[i][keyvalue[j]];
}
