// Base URL for your API
const API_BASE_URL = "https://your-backend-api.com"; // Replace with your actual backend URL

// Function to fetch actions from the API
async function fetchActions() {
  try {
    const response = await fetch(`${API_BASE_URL}/actions`);
    const data = await response.json();
    renderActions(data);
  } catch (error) {
    console.error("Error fetching actions:", error);
  }
}

// Function to add a new action via the API
async function addAction() {
  const actionType = document.getElementById("actionType").value;
  const amount = document.getElementById("amount").value;

  if (actionType && amount) {
    try {
      const response = await fetch(`${API_BASE_URL}/actions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: actionType, amount: parseFloat(amount) }),
      });

      if (response.ok) {
        fetchActions(); // Refresh actions after adding
      } else {
        alert("Failed to add action.");
      }
    } catch (error) {
      console.error("Error adding action:", error);
    }
  } else {
    alert("Please fill in both fields.");
  }
}

// Function to render actions
function renderActions(actions) {
  const actionsList = document.getElementById("actionsList");
  actionsList.innerHTML = "";

  actions.forEach((action) => {
    const li = document.createElement("li");
    li.textContent = `${action.type}: $${action.amount}`;
    actionsList.appendChild(li);
  });
}

// Fetch actions on page load
fetchActions();