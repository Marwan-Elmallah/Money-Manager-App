const API_BASE_URL = "https://wedata.onrender.com"; // Replace with your actual backend URL

// Show/hide sections based on authentication
function showSection(section) {
  document.getElementById("loginSection").style.display = section === "login" ? "block" : "none";
  document.getElementById("registerSection").style.display = section === "register" ? "block" : "none";
  document.getElementById("actionsSection").style.display = section === "actions" ? "block" : "none";
}

// Login function
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token
      showSection("actions");
      fetchActions();
    } else {
      alert("Login failed!");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

// Register function
async function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      showSection("login");
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
}

// Fetch actions function (authenticated)
async function fetchActions() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/actions`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      renderActions(data);
    } else {
      alert("Failed to fetch actions!");
    }
  } catch (error) {
    console.error("Fetch actions error:", error);
  }
}

// Add new action function (authenticated)
async function addAction() {
  const actionType = document.getElementById("actionType").value;
  const amount = document.getElementById("amount").value;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ type: actionType, amount: parseFloat(amount) })
    });

    if (response.ok) {
      fetchActions();
    } else {
      alert("Failed to add action!");
    }
  } catch (error) {
    console.error("Add action error:", error);
  }
}

// Render actions
function renderActions(actions) {
  const actionsList = document.getElementById("actionsList");
  actionsList.innerHTML = "";

  actions.forEach(action => {
    const li = document.createElement("li");
    li.textContent = `${action.type}: $${action.amount}`;
    actionsList.appendChild(li);
  });
}

// Show login section on page load
showSection("login");