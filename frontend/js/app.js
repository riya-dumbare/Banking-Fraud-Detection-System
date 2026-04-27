const API_BASE_URL = "http://127.0.0.1:5000";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return response.json();
}

async function fetchTransactionsFromApi() {
  const data = await apiRequest("/get-transactions");
  return data.transactions || [];
}

async function predictFraudFromApi(transaction) {
  return apiRequest("/predict-fraud", {
    method: "POST",
    body: JSON.stringify(transaction),
  });
}

async function updateTransactionStatus(id, status) {
  return apiRequest("/update-status", {
    method: "POST",
    body: JSON.stringify({ transaction_id: id, status }),
  });
}

async function loginUser(email, password) {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

async function signupUser(name, email, password) {
  return apiRequest("/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

function downloadReport(format = "csv") {
  window.open(`${API_BASE_URL}/export-report?format=${format}`, "_blank");
}
