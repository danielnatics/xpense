"use strict";

const selectArticles = document.getElementById("articles");
const selectTransport = document.getElementById("transport");
const selectFoodstuff = document.getElementById("foodstuff");
const selectSnacks = document.getElementById("snacks");
const selectOthers = document.getElementById("others");
const selectAmount = document.getElementById("amount");
const selectCommunication = document.getElementById("communication");

const categorySection = document.getElementById("categories");
const createXpenseBtn = document.getElementById("custom_btn");

const transactions = document.getElementById("transactions");
const summary = document.getElementById("total_xpenses");
const selectedField = document.getElementById("seleted");
const amountInputField = document.getElementById("select_amount_field");
const enterTransaction = document.getElementById("submit_transactions");

const enterBtn = document.querySelector(".enter-item");

// category contents
const articles = [
  "articles",
  "Bathing soap",
  "Washing soap",
  "Tooth paste",
  "Tissue",
  "Tooth brush",
];
const communication = [
  "Airtime/Date",
  "MTN Airtime",
  "Airtel Airtime",
  "GLO Airtime",
  "9Mobile Airtime",
  "MTN data",
  "Airtel data",
  "GLO data",
  "9Mobile data",
];
const transportation = ["Transport", "Keke", "shuttle", "bus", "bike"];
const foodstuffs = [
  "Foodstuff",
  "beans",
  "rice",
  "garri",
  "bread",
  "red oil",
  "indomie",
  "egg",
  "plantain",
];
const amounts = [
  "Amount",
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  1100,
  1200,
  1300,
  1400,
  1500,
  1600,
  1700,
  1800,
  1900,
  2000,
];
const snacks = ["snacks", "buns", "egg roll", "plastic drink", "biscuit"];
const others = ["custom"];

// Initializing local storage
function init() {
  localStorage.amounts = amounts;
  localStorage.others = others;
  localStorage.transports = transportation;
  localStorage.foodstuffs = foodstuffs;
  localStorage.snacks = snacks;
  localStorage.articles = articles;
  localStorage.communication = communication;
  // let storeAmount = localStorage.setItem("amounts", amounts);
  // let storeOthers = localStorage.setItem("others", others);
  // let storeFoodstuffs = localStorage.setItem("foodstuffs", foodstuffs);
  // let storeTransport = localStorage.setItem("transports", transportation);
  // let storeArticles = localStorage.setItem("articles", articles);
  // let storeSnacks = localStorage.setItem("snacks", snacks);

  //restore storage
  localStorage.date_time = "date/time";
  localStorage.itemName = "Transactions";
  localStorage.transaction_amount = "Cost";
  localStorage.setItem("total_xpense", 0);
  // localStorage.signedState = 0;
}
// init();
localStorage.removeItem("new");
// retrieving from local storage
let getAmount = localStorage.getItem("amounts").split(",");
let getArticle = localStorage.getItem("articles").split(",");
let getTransport = localStorage.getItem("transports").split(",");
let getFoodStuff = localStorage.getItem("foodstuffs").split(",");
let getSnacks = localStorage.getItem("snacks").split(",");
let getCommunication = localStorage.getItem("communication").split(",");
let getOthers = localStorage.getItem("others").split(",");
let getTotalXpense = localStorage.getItem("total_xpense");

// Display list
const displayList = function (category, tag) {
  category.forEach((items) => {
    if (typeof items === "string") {
      let trimmed = items.split(" ").join("-").toLowerCase();
      let html = `<option value="${items}">${items}</option>`;
      tag.insertAdjacentHTML("beforeEnd", html);
    } else if (typeof items === "number") {
      let html = `<option value="${items}">${items}</option>`;
      tag.insertAdjacentHTML("beforeEnd", html);
    }
  });
  const addHtml = `<option value="add" class="add-item" onmousedown="addItems()">Add Item +</option>`;
  tag.insertAdjacentHTML("beforeEnd", addHtml);
};
displayList(getArticle, selectArticles);
displayList(getFoodStuff, selectFoodstuff);
displayList(getTransport, selectTransport);
displayList(getAmount, selectAmount);
displayList(getSnacks, selectSnacks);
displayList(getCommunication, selectCommunication);
displayList(getOthers, selectOthers);

// display in input field
function displayInField(category) {
  category.addEventListener("change", function () {
    console.log(category.value);
    if (category.value === "add") {
      selectedField.value = "";
    } else {
      selectedField.value = category.value;
    }
  });
}
displayInField(selectArticles);
displayInField(selectTransport);
displayInField(selectFoodstuff);
displayInField(selectSnacks);
displayInField(selectCommunication);
displayInField(selectOthers);
// selectAmount.addEventListener("change", function () {
//   // selectedField.value = output;
//   if (output === "add") {
//     const addItem = Number(prompt("Add an Item"));
//     const getAmount = localStorage.getItem("amounts").split(",");
//     // console.log(getAmount);
//     getAmount.push(String(addItem));
//     console.log(getAmount);
//     localStorage.setItem("amounts", getAmount);
//     let addhtml = `<option value="${addItem}">${addItem}</option>`;
//     selectAmount.insertAdjacentHTML("afterbegin", addhtml);
//     console.log(localStorage.getItem("amounts"));
//   }
// });
function displayAmountField() {
  selectAmount.addEventListener("change", function () {
    amountInputField.value = selectAmount.value;
  });
}
displayAmountField();

const categories = [];
const transactionAmount = [];

let retrieveItemTemp = localStorage.getItem("itemName").split(",");
let retrieveAmountTemp = localStorage.getItem("transaction_amount").split(",");
let retrieveDateAndTimeTemp = localStorage.getItem("date_time").split(",");

// constructing date and time vaiable
const addDate = new Date();
// let time = addDate.toLocaleString("en-US", {
//   hour: "numeric",
//   minute: "numeric",
//   hour12: true,
// });
let time = addDate.toTimeString().slice(0, 8);
let date = addDate.toDateString().slice(4, 10).split(" ");
let [month, day] = date;
let dateAndTime = `${day.slice(1)}th ${month} ${time}`;
console.log(time);
// Event to enter transaction
enterTransaction.addEventListener("click", function (e) {
  e.preventDefault();

  if (!selectedField.value || !amountInputField.value) {
    alert("Select an item");
  } else {
    //update store
    retrieveItemTemp.push(selectedField.value);
    retrieveAmountTemp.push(amountInputField.value);
    retrieveDateAndTimeTemp.push(dateAndTime);

    console.log(retrieveDateAndTimeTemp);
    // console.log(retrieveCategory, retrieveAmount);
    // Update local storage
    localStorage.itemName = retrieveItemTemp;
    localStorage.transaction_amount = retrieveAmountTemp;
    localStorage.date_time = retrieveDateAndTimeTemp;
    // let storeItem = localStorage.setItem("itemName", retrieveItemTemp);
    // let storeTransactionAmount = localStorage.setItem(
    //   "transaction_amount",
    //   retrieveAmountTemp
    // );
    // let storeDateTime = localStorage.setItem(
    //   "date_time",
    //   retrieveDateAndTimeTemp
    // );

    // Fetching data from local storage
    let retrieveItemPerm = localStorage.getItem("itemName").split(",");
    let retrieveAmountPerm = localStorage
      .getItem("transaction_amount")
      .split(",");
    let retrieveDateAndTimePerm = localStorage.getItem("date_time").split(",");
    // console.log(retrieveDateAndTimePerm);
    let html = ` <div class="transactions_row">
                  <div class="transaction_details">
                      <div class="transaction_list" id="transaction_list">${
                        retrieveItemPerm[retrieveItemPerm.length - 1]
                      }</div>
                      <div class="date_time">${
                        retrieveDateAndTimePerm[
                          retrieveDateAndTimePerm.length - 1
                        ]
                      }</div>
                  </div>
                  <div class="transaction_amount">₦ ${
                    retrieveAmountPerm[retrieveAmountPerm.length - 1]
                  }</div>
                 </div>`;
    transactions.insertAdjacentHTML("beforeEnd", html);
    amountInputField.value = selectedField.value = "";

    //calculating total expenses
    retrieveAmountPerm.shift();
    let total = retrieveAmountPerm
      .map((amount) => Number(amount))
      .reduce((acc, add) => acc + add, 0);
    summary.textContent = total;
    console.log(total);
    localStorage.total_xpense = total;
    location.reload();
  }
});
let get = localStorage.getItem("transaction_amount").split(",");
console.log(get);
get.shift();
let total = get
  .map((amount) => Number(amount))
  .reduce((acc, add) => acc + add, 0);
console.log(total);

//restore storage
// localStorage.date_time = "date/time";
// localStorage.itemName = "Transactions";
// localStorage.transaction_amount = "Cost";

let retrieveItemPerm = localStorage.getItem("itemName").split(",");
let retrieveAmountPerm = localStorage.getItem("transaction_amount").split(",");
let retrieveDateAndTimePerm = localStorage.getItem("date_time").split(",");
retrieveItemPerm.forEach((item, i) => {
  let html = ` <div class="transactions_row">
     <div class="transaction_details">
     <div class="transaction_list" id="transaction_list">${item}</div>
      <div class="date_time">${retrieveDateAndTimePerm[i]}</div>
     </div>
      

      <div class="transaction_amount">₦ ${retrieveAmountPerm[i]}</div>
</div>`;
  transactions.insertAdjacentHTML("afterBegin", html);
  amountInputField.value = selectedField.value = "";
});

summary.textContent = Number(getTotalXpense);

// Add item function
const addItem = function (category, item, name) {
  category.addEventListener("change", function () {
    // console.log("changed");
    // console.log(category.value);
    const output = category.value;
    // console.log(item);
    let getItem = localStorage.getItem(item).split(",");
    // console.log(getItem);

    selectedField.value = output;
    if (output === "add") {
      const addItem = prompt("Add an Item");
      getItem.push(addItem);
      localStorage.setItem(item, getItem);
      let addhtml = `<option value="${addItem}">${addItem}</option>`;
      category.insertAdjacentHTML("beforeEnd", addhtml);
      console.log(localStorage.getItem(item));
      selectedField.value = "";
    }
  });
};

addItem(selectTransport, "transports");
addItem(selectFoodstuff, "foodstuffs");
addItem(selectArticles, "articles");
addItem(selectSnacks, "snacks");
addItem(selectCommunication, "communication");
addItem(selectOthers, "others");
// End of adding function

// Signing Up
// localStorage.signedState = 0;
// let getSignedState = localStorage.getItem("signedState");
// let state = Number(getSignedState);

let getSignedState = localStorage.getItem("signedState");
let state = Number(getSignedState);
if (!state) {
  summary.classList.add("invisible");
  transactions.classList.add("invisible");
  categorySection.classList.add("invisible");
  document.getElementById("select_field").classList.add("invisible");
  document.getElementById("amount").classList.add("invisible");
  summary.classList.add("invisible");
} else {
  summary.classList.remove("invisible");
  transactions.classList.remove("invisible");
  categorySection.classList.remove("invisible");
  document.getElementById("select_field").classList.remove("invisible");
  document.getElementById("amount").classList.remove("invisible");
  summary.classList.remove("invisible");
}

// document.querySelector("body").addEventListener("click", function () {
//   signUpBox.classList.add("invisible");
// });

// display sign up box

//Create dashboard

//refreshing dashboard
document.getElementById("refresh_btn").addEventListener("click", function () {
  init();
  location.reload();
});
