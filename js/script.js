let balance = 0;

// Haetaan HTML-elementit
const amountInput = document.getElementById("amount");
const balanceText = document.getElementById("balance");
const button = document.getElementById("addBtn");
const cryptoBtn = document.getElementById("cryptoBtn");


// Kuunnellaan napin painallusta
button.addEventListener("click", function() {
  
  // Otetaan käyttäjän syöte
  const value = Number(amountInput.value);

  // Logiikka
  balance += value;

  // Päivitetään HTML
  balanceText.textContent = balance;

  // Tyhjennetään input
  amountInput.value = "";
});

// cryptoBtn.addEventListener("click", function() {
//   window.location.href = "../expenses.html";
// });
