let signIn_name = document.getElementById("sname");
let nameSpan = document.getElementById("nameSpan");
let signIn_contact_no = document.getElementById("scontact");
let conatctSpan = document.getElementById("conatctSpan");
let signIn_mail = document.getElementById("smail");
let emailSpan = document.getElementById("emailSpan");
let signIn_password = document.getElementById("spass");
let passSpan = document.getElementById("passSpan");
let signIn_cpassword = document.getElementById("scpass");
let cpassSpan = document.getElementById("cpassSpan");
let sbutton = document.getElementById("sbtn");
let countS = [];
const valid = (ele) => {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
  let icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-circle-check");
  icon.setAttribute("id", "iconv");
  ele.appendChild(icon);
};

const invalid = (ele) => {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
  let icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-circle-exclamation");
  icon.setAttribute("id", "iconiv");
  ele.appendChild(icon);
};

const clearRules = (ele) => {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
};

const checkName = (ele, checkSpan) => {
  let val = ele.value;
  if (val && val.length >= 4 && val.charAt(0) !== " ") {
    if (
      val.includes("\\") ||
      val.includes("/") ||
      val.includes("*") ||
      val.includes("@") ||
      val.includes("#") ||
      val.includes("$") ||
      val.includes("%") ||
      val.includes("^") ||
      val.includes("&") ||
      val.includes("(") ||
      val.includes(")") ||
      val.includes("-") ||
      val.includes("_") ||
      val.includes("+") ||
      val.includes("<") ||
      val.includes(">") ||
      val.includes("?")
    ) {
      invalid(checkSpan);
      countS[0] = false;
    } else {
      valid(checkSpan);
      countS[0] = true;
    }
  } else {
    invalid(checkSpan);
    countS[0] = false;
  }
};

const checkContactNo = (ele, checkSpan) => {
  let val = ele.value;
  if (val && val.length === 10 && val.charAt(0) != " ") {
    if (val.includes("+") || val.includes("-")) {
      invalid(checkSpan);
      countS[1] = false;
    } else {
      valid(checkSpan);
      countS[1] = true;
    }
  } else {
    invalid(checkSpan);
    countS[1] = false;
  }
};

const checkMail = (ele, checkSpan) => {
  let val = ele.value;
  if (
    val &&
    val.length >= 5 &&
    val.charAt(0) !== " " &&
    val.includes("@") &&
    val.includes(".") &&
    val.indexOf("@") > 1 &&
    val.indexOf(".") >= val.indexOf("@") + 2 &&
    val.indexOf(".") < val.length - 1
  ) {
    valid(checkSpan);
    countS[2] = true;
  } else {
    invalid(checkSpan);
    countS[2] = false;
  }
};

const checkPass = (ele, checkSpan) => {
  let val = ele.value;
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
  if (val.match(passw)) {
    valid(checkSpan);
    countS[3] = true;
  } else {
    invalid(checkSpan);
    countS[3] = false;
  }
};

const checkCPass = (ele, checkSpan) => {
  let cofirmPassStoreVal = signIn_password.value;
  let val = ele.value;
  if (val === cofirmPassStoreVal) {
    valid(checkSpan);
    countS[4] = true;
  } else {
    invalid(checkSpan);
    countS[4] = false;
  }
};

signIn_name.addEventListener("input", function (e) {
  e.target.value ? checkName(e.target, nameSpan) : clearRules(nameSpan);
});
signIn_contact_no.addEventListener("input", function (e) {
  e.target.value
    ? checkContactNo(e.target, conatctSpan)
    : clearRules(conatctSpan);
});
signIn_mail.addEventListener("input", function (e) {
  e.target.value ? checkMail(e.target, emailSpan) : clearRules(emailSpan);
});
signIn_password.addEventListener("input", function (e) {
  e.target.value ? checkPass(e.target, passSpan) : clearRules(passSpan);
});

signIn_cpassword.addEventListener("input", function (e) {
  e.target.value ? checkCPass(e.target, cpassSpan) : clearRules(cpassSpan);
});

sbutton.addEventListener("click", function () {
  if (countS.every((element) => element === true)) {
    signIn_name.value = "";
    signIn_contact_no.value = "";
    signIn_mail.value = "";
    signIn_password.value = "";
    signIn_cpassword.value = "";
    let checkClasslist = document.getElementsByClassName("check");
    for(let ele of checkClasslist){
        clearRules(ele)
    }
    swal({
      title: "Good job !",
      text: "Your Details Successfully Stored 🙂 ! ",
      icon: "success",
      button: "All Done!",
    });
  }
});


