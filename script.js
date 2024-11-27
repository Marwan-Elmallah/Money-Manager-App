// Array to store actions
let actions = [];

// Function to add a new action
function addAction() {
  const actionType = document.getElementById("actionType").value;
  const amount = document.getElementById("amount").value;

  if (actionType && amount) {
    actions.push({ type: actionType, amount: parseFloat(amount) });
    renderActions();
  } else {
    alert("Please fill in both fields.");
  }
}

// Function to render actions
function renderActions() {
  const actionsList = document.getElementById("actionsList");
  actionsList.innerHTML = "";

  actions.forEach((action, index) => {
    const li = document.createElement("li");
    li.textContent = `${action.type}: $${action.amount}`;
    actionsList.appendChild(li);
  });
}
