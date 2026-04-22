
const labelBalance = document.querySelector("#labelBalance");
const inputBalance = document.querySelector("#textAmount");
const btnSetBalance = document.querySelector("#addBtn");
const inputExpenseValue = document.querySelector("#textExpense");
const inputExplanation = document.querySelector("#explanation");
const addExpenseBtn = document.querySelector("#expenseBtn");
const expenseSum = document.querySelector("#expensesLabel")
const expenseForm = addExpenseBtn.closest("form");
const list = document.getElementById("list");

let balance = 0;
let totalExpenses = 0;


const setBalance = () => {
  const input = Number(inputBalance.value);
  balance = input;
  labelBalance.textContent = balance;
  inputBalance.value = "";
}


const addExpense = () => {
const value = Number(inputExpenseValue.value);
  const explanation = inputExplanation.value;
  balance -= value;
  totalExpenses += value;
 
  const li = document.createElement("li");
  li.textContent = explanation + ": " + value + " €";

      //create button for li element to delete 
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", () => {
        //change other values when expense deleted
      balance += value;
      totalExpenses -= value;

      labelBalance.textContent = balance;
      expenseSum.textContent = totalExpenses;
      li.remove();
    });

  li.appendChild(deleteBtn);
  list.appendChild(li);
  
  labelBalance.textContent = balance;
  expenseSum.textContent = totalExpenses;
  inputExplanation.value = "";
  inputExpenseValue.value = "";
  inputExpenseValue.focus();

}

btnSetBalance.addEventListener("click", () => setBalance());


expenseForm.addEventListener("submit", (event) => {
  event.preventDefault()
  addExpense();
});
