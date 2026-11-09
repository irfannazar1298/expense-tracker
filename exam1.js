let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = -1;

const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");
const filter = document.getElementById("filter");

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function showExpenses() {
  list.innerHTML = "";
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    total += Number(expense.amount);

    if (filter.value === "" || filter.value === expense.category) {
      let row = document.createElement("tr");

      [expense.name, "₹" + expense.amount, expense.category, expense.date].forEach(function (value) {
        let cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      let actions = document.createElement("td");
      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "btn btn-sm btn-warning me-2";
      editButton.onclick = function () {
        editIndex = i;
        document.getElementById("name").value = expense.name;
        document.getElementById("amount").value = expense.amount;
        document.getElementById("category").value = expense.category;
        document.getElementById("date").value = expense.date;
        document.getElementById("submitButton").textContent = "Update";
      };

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "btn btn-sm btn-danger";
      deleteButton.onclick = function () {
        expenses.splice(i, 1);
        saveExpenses();
        showExpenses();
      };

      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      row.appendChild(actions);
      list.appendChild(row);
    }
  }

  document.getElementById("total").textContent = "₹" + total.toFixed(2);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let expense = {
    name: document.getElementById("name").value,
    amount: document.getElementById("amount").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value
  };

  if (editIndex === -1) {
    expenses.push(expense);
  } else {
    expenses[editIndex] = expense;
    editIndex = -1;
    document.getElementById("submitButton").textContent = "Add Expense";
  }

  saveExpenses();
  form.reset();
  showExpenses();
});

filter.addEventListener("change", showExpenses);
showExpenses();
