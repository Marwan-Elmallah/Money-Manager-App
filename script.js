const API_BASE_URL = "https://wedata.onrender.com"; // Replace with your actual backend URL

function navigateTo(route) {
  const token = localStorage.getItem("token");
  
  if (route === "actions" && !token) {
    alert("You must log in to access this page.");
    return;
  }

  // Show only the target section
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  document.getElementById(`${route}Section`).style.display = "block";
}

// Login function
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token
      navigateTo("actions");
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
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      navigateTo("login");
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
}

// Fetch actions function
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

// Add new action function
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

  actions.forEach((action) => {
    const li = document.createElement("li");
    li.textContent = `${action.type}: $${action.amount}`;
    actionsList.appendChild(li);
  });
}

// Default navigation to login on page load
navigateTo("login");