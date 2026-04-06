// let balance = 0;

// // Haetaan HTML-elementit
// const amountInput = document.getElementById("amount");
// const balanceText = document.getElementById("balance");
// const button = document.getElementById("addBtn");
// const cryptoBtn = document.getElementById("cryptoBtn");


// // Kuunnellaan napin painallusta
// button.addEventListener("click", function() {
  
//   // Otetaan käyttäjän syöte
//   const value = Number(amountInput.value);

//   // Logiikka
//   balance += value;

//   // Päivitetään HTML
//   balanceText.textContent = balance;

//   // Tyhjennetään input
//   amountInput.value = "";
// });

// cryptoBtn.addEventListener("click", function() {
//   window.location.href = "../expenses.html";
// });


let balance = 0;
let expenseSum = 0;


const labelBalance = document.getElementById("labelBalance");
const addBtn = document.getElementById("addBtn");
const textAmount = document.getElementById("textAmount");

const expenseBtn = document.getElementById("expenseBtn");
const textExpense = document.getElementById("textExpense");
const textExplanation = document.getElementById("explanation");
const list = document.getElementById("list");
const textExpenses = document.getElementById("expensesLabel");

addBtn.addEventListener("click", function() {
  const value = Number(textAmount.value);
  balance = value;
  labelBalance.textContent = balance;
  textAmount.value = "";

})

expenseBtn.addEventListener("click", function() {
  
  const value = Number(textExpense.value);
  const explanation = textExplanation.value;
  const expensesSum = Number(textExpenses.value);
  balance -= value;
  expenseSum += value;
 
  const li = document.createElement("li");
  li.textContent = explanation + ": " + value + " €";
  list.appendChild(li);
  
  labelBalance.textContent = balance;
  textExpenses.textContent = expenseSum;
  textExpense.value = "";
  textExplanation.value = "";
})

