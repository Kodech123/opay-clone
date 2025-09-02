"use strict";
const user1 = {
  fullName: "Chukwudi Felix",
  phoneNumber: "09042404722",
  email: "felixchukwudi126@gmail.com",
  users: ["Chika Okere","Ndubisi Madu","Chima Obim","Chika Okere","Ahmed Justice","Happiness Felix"],
  transaction: [200, 400, -20, 5000, 100, 500],
  passWord: "kudi2003",
};

const user2 = {
  fullName: "Chioma Felix",
  phoneNumber: "08052388240",
  transaction: [200, 400, -20, 5000, -100],
  passWord: "chibaby",
  users: ["Ameka", "Obi", "Ikenna", "Chika", "Ngozi"]
};

let account = [user1, user2];

const container = document.querySelector(".container");
const form = document.querySelector(".form");
const inputNumber = document.querySelector(".input");
const inputPassword = document.querySelector(".passwordInput");
const wrongPassword = document.querySelector("wrong");

const createName = document.querySelector(".fullName");
const createNumber = document.querySelector(".phoneInput");
const createEmail = document.querySelector(".emailInput");
const createPassword = document.querySelector(".createPassword");

const loginBtn = document.querySelector(".btn-login");
const createBtn = document.querySelector(".btn-create");

const footer = document.querySelectorAll(".footer-signup");
//sections
const login = document.querySelector(".login");
const createAccount = document.querySelector(".createAccount");
//dashboard
const welcomeMessage = document.getElementById("welcomeName");
const dashboard = document.querySelector(".dashboardContainer");
const totalBalance = document.querySelector(".totalBalance");
//transaction
const containerTransact = document.querySelector(".transSumary");
const transGoBack = document.querySelector(".transGoBack");
const transactionPage = document.querySelector(".transaction-page");
const transLink = document.querySelector(".transLink");

let currentAccount;

//creating a user
createBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("connected");

  //collecting user value
  let fullName = createName.value;
  let phoneNumber = createNumber.value;
  let email = createEmail.value;
  let transaction = [2000];
  let passWord = createPassword.value;

  //checking if email already exist
  // check email contains '@'
  if (!email.includes("@")) {
    alert("Invalid email");
    return;
  }

  // check phone is 11 digits (only numbers)
  if (!/^\d{11}$/.test(phoneNumber)) {
    alert("Invalid phone number.");
    return;
  }

  // check if email already exists
  if (account.some((u) => u.email === email)) {
    alert("Email already registered. Please login.");
    return;
  }

  //create user account
  let user = {
    id: Date.now(),
    fullName,
    phoneNumber,
    email,
    transaction,
    passWord,
  };
  //sending it to the normal account
  account.push(user);
  return showLogin();
});

//login button

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = account.find(
    (username) => username.email === inputNumber.value
  );

  if (currentAccount?.passWord === inputPassword.value) {
    console.log(currentAccount);
    showDashboard();
  } else if (!inputNumber.value || !inputPassword.value) {
    alert("Please provide an input");
  } else {
    alert("wrong password or phone number");
  }
});

transLink.addEventListener("click", showTransaction);

transGoBack.addEventListener("click", function () {
  transactionPage.classList.add("hidden");
  dashboard.classList.remove("hidden");
});

const userFirst = (user) => user.fullName.split("");
console.log(userFirst(user1));

const showLogin = function (e) {
  e.preventDefault();
  login.classList.remove("hidden");
  createAccount.classList.add("hidden");
  dashboard.classList.add("hidden");
};
const showCreateAcct = function () {
  login.classList.add("hidden");
  createAccount.classList.remove("hidden");
};
console.log(account);

const showDashboard = function () {
  container.classList.add("hidden");
  dashboard.classList.remove("hidden");
  userDashboard(currentAccount);
};

function showTransaction(a) {
  a.preventDefault();
  dashboard.classList.add("hidden");
  transactionPage.classList.remove("hidden");
}

function userDashboard(user) {
  welcomeMessage.textContent = `HI, ${user.fullName
    .split(" ")[0]
    .toUpperCase()}`;
}

//Implementing the Transaction Features
const displayTrans = function (user) {
  
  user.users.forEach(function (name, i) {

    const amount = user.transaction[i];
    const check = amount > 0 ? "deposit" : "withdrawer";
    const symbol =
      amount > 0
        ? '<i class="fa-solid fa-arrow-down fa"></i>'
        : '<i class="fa-solid fa-arrow-up-from-bracket"></i>';

    const heyHtml = `<div class="transSection"><div class="transfer-left  transfer-${check}">
         ${symbol}
        </div>
        <div class="mini-transaction">
          <ul>
            <li>${name}</li>
            <li class="date">Aug 24th, 13:33:32</li>
          </ul>
        </div>
        <div class="amount-succes transfer-${check}">
          <ul>
            <li class="amount">$${amount}.00</li>
            <li class="alert">succesfull</li>
          </ul>
        </div>
        </div>`;
    containerTransact.insertAdjacentHTML("beforeend", heyHtml);
  });
};
displayTrans(user1);
