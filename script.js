let encryptionRule = {
  A: "N",
  B: "O",
  C: "P",
  D: "Q",
  E: "R",
  F: "S",
  G: "T",
  H: "U",
  I: "V",
  J: "W",
  K: "X",
  L: "Y",
  M: "Z",
  N: "A",
  O: "B",
  P: "C",
  Q: "D",
  R: "E",
  S: "F",
  T: "G",
  U: "H",
  V: "I",
  W: "J",
  X: "K",
  Y: "L",
  Z: "M",
  a: "n",
  b: "o",
  c: "p",
  d: "q",
  e: "r",
  f: "s",
  g: "t",
  h: "u",
  i: "v",
  j: "w",
  k: "x",
  l: "y",
  m: "z",
  n: "a",
  o: "b",
  p: "c",
  q: "d",
  r: "e",
  s: "f",
  t: "g",
  u: "h",
  v: "i",
  w: "j",
  x: "k",
  y: "l",
  z: "m",
  0: "5",
  1: "6",
  2: "7",
  3: "8",
  4: "9",
  5: "0",
  6: "1",
  7: "2",
  8: "3",
  9: "4",
  "!": "#",
  $: "%",
  "&": "+",
  "-": "@",
  _: "~",
  "#": "!",
  "%": "$",
  "+": "&",
  "@": "-",
  "~": "_",
};
const DB_USERS = [];

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
let logIn_mail = document.getElementById("lmail");
let logIn_password = document.getElementById("lpass");
let logIn_btn = document.getElementById("lbtn");
let passVisibility = document.getElementById("password_visiable");
let cpassVisibility = document.getElementById("cpassword_visiable");
let lpassVisibility = document.getElementById("lpassword_visiable");
let lForget = document.getElementById("lf");
let sForget = document.getElementById("sf");
let countS = [false, false, false, false, false];

const encrypt = (inputPassword) => {
  let encryptedPassword = "";
  for (char of inputPassword) {
    encryptedPassword = encryptedPassword + encryptionRule[char];
  }
  return encryptedPassword;
};

const decrypt = (encryptedPassword) => {
  let actualPassword = "";
  let keys = Object.keys(encryptionRule);
  let values = Object.values(encryptionRule);
  for (char of encryptedPassword) {
    let requiredIndex = values.findIndex((value) => value === char);
    actualPassword = actualPassword + keys[requiredIndex];
  }
  return actualPassword;
};

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

const resetSignupFields = () => {
  signIn_name.value = "";
  signIn_contact_no.value = "";
  signIn_mail.value = "";
  signIn_password.value = "";
  signIn_cpassword.value = "";
};

const resetLoginFields = () => {
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
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

let forgetError = () => {
  swal({
    title: "Opps!",
    text: "This Feature Is Currently Not Available!",
    icon: "warning",
    button: "Sorry!",
  });
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
  let checkFeild = countS.every((element) => element === true);
  if (checkFeild) {
    let userDetails = {
      fname: signIn_name.value,
      contact: signIn_contact_no.value,
      email: signIn_mail.value,
      password: encrypt(signIn_password.value),
    };

    DB_USERS.push(userDetails);
    resetSignupFields();
    let checkClasslist = document.getElementsByClassName("check");
    for (let ele of checkClasslist) {
      clearRules(ele);
    }
    swal({
      title: "Good job !",
      text: "Your Details Successfully Stored 🙂 ! ",
      icon: "success",
      button: "All Done!",
    });
    console.log(DB_USERS);
  } else {
    swal({
      title: "Sorry !",
      text: "Kindly Fill The All Details..!",
      icon: "warning",
      button: "Ok !",
    });
  }
});

logIn_btn.addEventListener("click", function () {
  let enteredEmail = logIn_mail.value;
  let enteredPassword = logIn_password.value;
  if (logIn_mail.value && logIn_password.value) {
    let currentUser = DB_USERS.find(
      (user) =>
        user.email === enteredEmail &&
        decrypt(user.password) === enteredPassword
    );
    if (currentUser) {
      swal({
        title: "Great !",
        text: "Your Are Log In Successfully 🙂 ! ",
        icon: "success",
        button: "All Done!",
      });
      logIn_mail.value = "";
      logIn_password.value = "";
    } else {
      swal({
        title: "Opps !",
        text: "Your Credentials does not match!",
        icon: "warning",
        button: "Ok !",
      });
    }
  } else {
    swal({
      title: "Sorry !",
      text: "Kindly Fill The All Details..!",
      icon: "warning",
      button: "Ok !",
    });
  }
});

passVisibility.addEventListener("click", function () {
  if (signIn_password.type == "password") {
    passVisibility.classList.remove("fa-eye");
    passVisibility.classList.add("fa-eye-slash");
    signIn_password.setAttribute("type", "text");
    // passVisibility.setAttribute("id","password_hide")
  } else if (signIn_password.type == "text") {
    passVisibility.classList.add("fa-eye");
    passVisibility.classList.remove("fa-eye-slash");
    signIn_password.setAttribute("type", "password");
  }
});

cpassVisibility.addEventListener("click", function () {
  if (signIn_cpassword.type == "password") {
    cpassVisibility.classList.remove("fa-eye");
    cpassVisibility.classList.add("fa-eye-slash");
    signIn_cpassword.setAttribute("type", "text");
    // cpassVisibility.setAttribute("id","password_hide")
  } else if (signIn_cpassword.type == "text") {
    cpassVisibility.classList.add("fa-eye");
    cpassVisibility.classList.remove("fa-eye-slash");
    signIn_cpassword.setAttribute("type", "password");
  }
});

lpassVisibility.addEventListener("click", function () {
  if (logIn_password.type == "password") {
    lpassVisibility.classList.remove("fa-eye");
    lpassVisibility.classList.add("fa-eye-slash");
    logIn_password.setAttribute("type", "text");
    // lpassVisibility.setAttribute("id","password_hide")
  } else if (logIn_password.type == "text") {
    lpassVisibility.classList.add("fa-eye");
    lpassVisibility.classList.remove("fa-eye-slash");
    logIn_password.setAttribute("type", "password");
  }
});

lForget.addEventListener("click", forgetError);
sForget.addEventListener("click", forgetError);
