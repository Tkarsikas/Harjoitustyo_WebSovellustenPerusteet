const balance_element_sum = document.querySelector("#labelBalance")
const balance_element_btn = document.querySelector("#addBtn")
const balance_element_input = document.querySelector("#textAmount")

const expense_element_amount = document.querySelector("#textExpense")
const expense_element_explanation = document.querySelector("#explanation")
const expense_element_btn = document.querySelector("#expenseBtn")
const expense_element_sum = document.querySelector("#expensesLabel")
const expense_element_list = document.querySelector("#list")
const expenseForm = expense_element_btn.closest("form");
const reset_element_btn = document.querySelector("#resetStorage")

const STORAGE_KEY = "expensesAppState";

let totalBalance = 0
let totalExpenses = 0
let expensesList = [];

const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        totalBalance,
        totalExpenses,
        expensesList
    }))
}

const loadState = () => {
    const rawState = localStorage.getItem(STORAGE_KEY)

    if(!rawState){
        return
    }
    const state = JSON.parse(rawState)
    totalBalance = state.totalBalance
    totalExpenses = state.totalExpenses
    expensesList = state.expensesList
}

const renderState = () => {
    
    expense_element_list.innerHTML = ""
    
    expensesList.forEach((expense) => {
        const li = document.createElement("li")
        li.dataset.id = expense.id

        const text = document.createElement("span")
        text.className = "item-text"
        text.textContent = `${expense.explanation}: ${expense.value} €`
    
        const button = document.createElement("button")
        button.type = "button"
        button.textContent = "X"

        button.addEventListener("click", () => {
            totalBalance += expense.value
            totalExpenses -= expense.value
            expensesList = expensesList.filter((item) => item.id !== expense.id)
            saveState()
            renderState()
        })

        
        li.appendChild(button)
        li.appendChild(text)
        expense_element_list.appendChild(li)
    })

    balance_element_sum.textContent = totalBalance
    expense_element_sum.textContent = totalExpenses

    
}

const setBalance = () => {
    const input = Number(balance_element_input.value)
    totalBalance = input
    balance_element_input.value = ""
}

const addExpense = () => {
    const explanation = expense_element_explanation.value
    const value = Number(expense_element_amount.value)

    totalBalance -= value
    totalExpenses += value

    expensesList.push({
        id: Date.now(),
        value,
        explanation
    })

    expense_element_amount.value = ""
    expense_element_explanation.value = ""
    expense_element_amount.focus()
}

const resetLocalstorage = () => {
    totalBalance = 0
    totalExpenses = 0
    expensesList = []

    saveState()
    renderState()
}

if (reset_element_btn) {
    reset_element_btn.addEventListener("click", () => {
        resetLocalstorage()
    })
}

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addExpense()
    saveState()
    renderState()
})

balance_element_btn.addEventListener("click", () => {
    setBalance()
    saveState()
    renderState()
})

document.addEventListener("DOMContentLoaded", () => {
    loadState()
    renderState()
})

