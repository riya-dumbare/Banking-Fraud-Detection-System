const customers = [
  {
    id: "CUS-1048",
    name: "Aisha Smith",
    segment: "Premium Retail",
    homeCountry: "US",
    kyc: "Verified",
    accountAgeMonths: 64,
    avgSpend: 320,
    riskTier: "Low",
    trustedDevices: ["iPhone 15", "Chrome MacBook"],
    recentLocations: ["New York, US", "Boston, US"],
  },
  {
    id: "CUS-2041",
    name: "Omar Patel",
    segment: "SME Owner",
    homeCountry: "US",
    kyc: "Enhanced Due Diligence",
    accountAgeMonths: 18,
    avgSpend: 880,
    riskTier: "Medium",
    trustedDevices: ["Pixel 8", "Chrome Windows"],
    recentLocations: ["Dallas, US", "Austin, US"],
  },
  {
    id: "CUS-3119",
    name: "Nina Brooks",
    segment: "Retail",
    homeCountry: "US",
    kyc: "Verified",
    accountAgeMonths: 41,
    avgSpend: 145,
    riskTier: "Low",
    trustedDevices: ["Safari iPhone"],
    recentLocations: ["Austin, US"],
  },
  {
    id: "CUS-4472",
    name: "Jared Kim",
    segment: "Digital First",
    homeCountry: "US",
    kyc: "Verified",
    accountAgeMonths: 9,
    avgSpend: 260,
    riskTier: "Medium",
    trustedDevices: ["Edge Windows"],
    recentLocations: ["Seattle, US"],
  },
  {
    id: "CUS-5288",
    name: "Maya Chen",
    segment: "Premium Retail",
    homeCountry: "US",
    kyc: "Verified",
    accountAgeMonths: 72,
    avgSpend: 210,
    riskTier: "Low",
    trustedDevices: ["iPhone 14", "Safari MacBook"],
    recentLocations: ["Boston, US"],
  },
  {
    id: "CUS-6930",
    name: "Eli Turner",
    segment: "Wealth",
    homeCountry: "US",
    kyc: "Enhanced Due Diligence",
    accountAgeMonths: 27,
    avgSpend: 1240,
    riskTier: "Medium",
    trustedDevices: ["Chrome MacBook"],
    recentLocations: ["San Francisco, US"],
  },
  {
    id: "CUS-7342",
    name: "Ivy Ross",
    segment: "Retail",
    homeCountry: "US",
    kyc: "Verified",
    accountAgeMonths: 36,
    avgSpend: 180,
    riskTier: "Low",
    trustedDevices: ["Firefox Linux"],
    recentLocations: ["Seattle, US"],
  },
  {
    id: "CUS-8451",
    name: "Lena Ortiz",
    segment: "Retail",
    homeCountry: "US",
    kyc: "Manual Watch",
    accountAgeMonths: 5,
    avgSpend: 160,
    riskTier: "High",
    trustedDevices: ["Chrome Android"],
    recentLocations: ["Denver, US"],
  },
];

let transactions = [
  {
    id: "TX-9081",
    customerId: "CUS-1048",
    date: "2026-04-25 09:21",
    merchant: "Apex Electronics",
    amount: 248.9,
    channel: "POS Card",
    location: "New York, US",
    device: "iPhone 15",
    status: "approved",
    category: "Retail",
    ipRisk: 8,
    velocity24h: 2,
  },
  {
    id: "TX-9082",
    customerId: "CUS-2041",
    date: "2026-04-25 10:08",
    merchant: "Rapid Wire Transfer",
    amount: 9820,
    channel: "Wire",
    location: "Lagos, NG",
    device: "Unknown Android",
    status: "review",
    category: "Transfer",
    ipRisk: 76,
    velocity24h: 9,
  },
  {
    id: "TX-9083",
    customerId: "CUS-3119",
    date: "2026-04-25 11:34",
    merchant: "Metro Fuel",
    amount: 72.6,
    channel: "POS Card",
    location: "Austin, US",
    device: "Safari iPhone",
    status: "approved",
    category: "Travel",
    ipRisk: 5,
    velocity24h: 1,
  },
  {
    id: "TX-9084",
    customerId: "CUS-4472",
    date: "2026-04-25 02:16",
    merchant: "Crypto Bay",
    amount: 4500,
    channel: "Online",
    location: "Kyiv, UA",
    device: "Tor Browser",
    status: "blocked",
    category: "Crypto",
    ipRisk: 91,
    velocity24h: 7,
  },
  {
    id: "TX-9085",
    customerId: "CUS-5288",
    date: "2026-04-25 13:12",
    merchant: "Fresh Market",
    amount: 118.22,
    channel: "POS Card",
    location: "Boston, US",
    device: "iPhone 14",
    status: "approved",
    category: "Groceries",
    ipRisk: 4,
    velocity24h: 1,
  },
  {
    id: "TX-9086",
    customerId: "CUS-6930",
    date: "2026-04-25 03:41",
    merchant: "Luxury Exchange",
    amount: 12950,
    channel: "Online",
    location: "Dubai, AE",
    device: "Unknown Windows",
    status: "review",
    category: "Luxury",
    ipRisk: 67,
    velocity24h: 6,
  },
  {
    id: "TX-9087",
    customerId: "CUS-7342",
    date: "2026-04-25 14:20",
    merchant: "CloudSub Pro",
    amount: 49,
    channel: "Online",
    location: "Seattle, US",
    device: "Firefox Linux",
    status: "approved",
    category: "Software",
    ipRisk: 10,
    velocity24h: 2,
  },
  {
    id: "TX-9088",
    customerId: "CUS-8451",
    date: "2026-04-25 04:05",
    merchant: "ATM Withdrawal",
    amount: 2200,
    channel: "ATM",
    location: "Manila, PH",
    device: "Unknown ATM",
    status: "review",
    category: "Cash",
    ipRisk: 84,
    velocity24h: 5,
  },
  {
    id: "TX-9089",
    customerId: "CUS-2041",
    date: "2026-04-25 10:42",
    merchant: "Vendor ACH Batch",
    amount: 4200,
    channel: "ACH",
    location: "Dallas, US",
    device: "Chrome Windows",
    status: "review",
    category: "Transfer",
    ipRisk: 22,
    velocity24h: 10,
  },
  {
    id: "TX-9090",
    customerId: "CUS-6930",
    date: "2026-04-25 12:08",
    merchant: "Private Jet Hold",
    amount: 7600,
    channel: "Online",
    location: "Miami, US",
    device: "Chrome MacBook",
    status: "review",
    category: "Travel",
    ipRisk: 31,
    velocity24h: 4,
  },
];

let authMode = "login";
let feedPaused = false;
let lineChart;
let donutChart;
let selectedTxId = "TX-9082";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const customerById = (id) => customers.find((customer) => customer.id === id);
const txCustomer = (tx) => customerById(tx.customerId) || customers[0];

function riskScore(tx) {
  const customer = txCustomer(tx);
  let score = 8;
  const reasons = [];
  const hour = Number(tx.date.split(" ")[1].split(":")[0]);
  if (tx.amount > customer.avgSpend * 4) {
    score += 22;
    reasons.push(`Amount is ${(tx.amount / customer.avgSpend).toFixed(1)}x above normal spend.`);
  }
  if (tx.amount > 5000) {
    score += 18;
    reasons.push("Large-value transaction requires enhanced authorization.");
  }
  if (!tx.location.endsWith(customer.homeCountry)) {
    score += 20;
    reasons.push("Geographic mismatch against customer home region.");
  }
  if (!customer.trustedDevices.includes(tx.device)) {
    score += 16;
    reasons.push("Unrecognized device or channel fingerprint.");
  }
  if (["Crypto", "Luxury", "Transfer", "Cash"].includes(tx.category)) {
    score += 12;
    reasons.push("High-risk merchant/category pattern detected.");
  }
  if (tx.velocity24h > 5) {
    score += 12;
    reasons.push("Transaction velocity is above behavioral baseline.");
  }
  if (tx.ipRisk > 60) {
    score += 12;
    reasons.push("Network intelligence indicates elevated IP/device risk.");
  }
  if (hour < 5) {
    score += 8;
    reasons.push("Transaction occurred during unusual off-hours.");
  }
  if (customer.riskTier === "High") {
    score += 8;
    reasons.push("Customer profile is already on watch list.");
  }
  const finalScore = Math.min(score, 98);
  const level = finalScore >= 70 ? "high" : finalScore >= 42 ? "medium" : "low";
  return {
    score: finalScore,
    level,
    reasons: reasons.length ? reasons : ["Transaction behavior matches customer baseline."],
  };
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  $("#toastStack").appendChild(node);
  setTimeout(() => node.remove(), 3200);
}

function setPage(page) {
  $$(".page").forEach((node) => node.classList.toggle("active-page", node.id === page));
  $$(".nav-item").forEach((node) => node.classList.toggle("active", node.dataset.page === page));
  $("#sidebar").classList.remove("open");
  if (page === "transactions" && !lineChart) initCharts();
}

function getFlagged() {
  return transactions.filter((tx) => riskScore(tx).level !== "low" || tx.status === "review");
}

function renderDashboard() {
  const flagged = getFlagged();
  const highRisk = transactions.filter((tx) => riskScore(tx).level === "high");
  const avg = Math.round(
    transactions.reduce((sum, tx) => sum + riskScore(tx).score, 0) / transactions.length,
  );
  $("#today").textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  $("#flaggedCount").textContent = flagged.length;
  $("#queueCount").textContent = flagged.filter((tx) => tx.status === "review").length;
  $("#exposureAmount").textContent = formatMoney(highRisk.reduce((sum, tx) => sum + tx.amount, 0));
  $("#blockedExposure").textContent = formatMoney(
    transactions.filter((tx) => tx.status === "blocked").reduce((sum, tx) => sum + tx.amount, 0),
  );
  $("#avgScore").textContent = `${avg}%`;
  $("#alertCount").textContent = flagged.length;
  animateBalance(156420.8);
  $("#recentTransactions").innerHTML = flagged.slice(0, 6).map(transactionRow).join("");
  $("#fraudAlerts").innerHTML = flagged.slice(0, 5).map(alertRow).join("");
}

function transactionRow(tx) {
  const risk = riskScore(tx);
  const customer = txCustomer(tx);
  return `<article class="tx-row" data-id="${tx.id}"><div><strong>${tx.merchant}</strong><span>${customer.name} · ${tx.date} · ${tx.location}</span></div><span class="amount">${formatMoney(tx.amount)}</span>${scoreBar(risk)}</article>`;
}

function alertRow(tx) {
  const risk = riskScore(tx);
  return `<article class="alert-row" data-id="${tx.id}"><div><strong>${tx.id} · ${tx.merchant}</strong><span>${risk.reasons[0]}</span></div><span class="badge ${risk.level}">${risk.score}% ${risk.level}</span></article>`;
}

function scoreBar(risk) {
  return `<div class="score-wrap"><div class="score-meta"><span>Fraud Score</span><strong class="${risk.level}">${risk.score}%</strong></div><div class="score-track"><span class="score-fill ${risk.level}" style="width:${risk.score}%"></span></div></div>`;
}

function filteredTransactions() {
  const search = $("#fraudSearch").value.toLowerCase();
  const filter = $("#riskFilter").value;
  const min = Number($("#minAmount").value || 0);
  return transactions.filter((tx) => {
    const risk = riskScore(tx);
    const customer = txCustomer(tx);
    const haystack =
      `${tx.merchant} ${tx.location} ${tx.device} ${customer.name} ${customer.id}`.toLowerCase();
    return (
      haystack.includes(search) && tx.amount >= min && (filter === "all" || risk.level === filter)
    );
  });
}

function renderFraudTable() {
  const rows = filteredTransactions();
  $("#resultCount").textContent = `${rows.length} records`;
  $("#fraudTable").innerHTML = rows
    .map((tx) => {
      const risk = riskScore(tx);
      const customer = txCustomer(tx);
      return `<tr data-id="${tx.id}"><td>${tx.date}</td><td><strong>${customer.name}</strong><small>${customer.id}</small></td><td>${tx.merchant}</td><td>${formatMoney(tx.amount)}</td><td>${tx.channel}</td><td>${scoreBar(risk)}</td><td><span class="badge ${tx.status}">${tx.status}</span></td><td><button class="ghost-btn mini review-action" data-review="${tx.id}" type="button">Review</button></td></tr>`;
    })
    .join("");
  renderSelectedDetails();
}

function renderSelectedDetails() {
  const tx =
    transactions.find((item) => item.id === selectedTxId) ||
    filteredTransactions()[0] ||
    transactions[0];
  if (!tx) return;
  selectedTxId = tx.id;
  const risk = riskScore(tx);
  const customer = txCustomer(tx);
  const customerTx = transactions.filter((item) => item.customerId === customer.id).slice(0, 6);
  $("#customerProfile").innerHTML =
    `<div class="profile-top"><div><strong>${customer.name}</strong><span>${customer.id} · ${customer.segment}</span></div><span class="badge ${customer.riskTier.toLowerCase()}">${customer.riskTier}</span></div>${scoreBar(risk)}<dl><div><dt>KYC</dt><dd>${customer.kyc}</dd></div><div><dt>Account age</dt><dd>${customer.accountAgeMonths} months</dd></div><div><dt>Avg spend</dt><dd>${formatMoney(customer.avgSpend)}</dd></div><div><dt>Trusted devices</dt><dd>${customer.trustedDevices.join(", ")}</dd></div></dl><h4>Risk Explanation</h4><ul>${risk.reasons.map((reason) => `<li>${reason}</li>`).join("")}</ul>`;
  $("#historyTimeline").innerHTML = customerTx
    .map((item) => {
      const itemRisk = riskScore(item);
      return `<article class="timeline-item ${itemRisk.level}"><strong>${item.date}</strong><span>${item.merchant} · ${formatMoney(item.amount)}</span><em>${item.status} · ${itemRisk.score}% score</em></article>`;
    })
    .join("");
}

function renderLiveFeed() {
  $("#liveFeed").innerHTML = transactions.slice(0, 7).map(transactionRow).join("");
}

function renderCases() {
  const flagged = getFlagged();
  $("#pendingCases").textContent = flagged.filter((tx) => tx.status === "review").length;
  $("#blockedCases").textContent = transactions.filter((tx) => tx.status === "blocked").length;
  $("#caseCards").innerHTML = flagged
    .map((tx) => {
      const risk = riskScore(tx);
      const customer = txCustomer(tx);
      return `<article class="case-card"><div class="case-title"><strong>${tx.id} · ${tx.merchant}</strong><span class="badge ${tx.status}">${tx.status}</span></div><p>${customer.name} · ${tx.location} · ${formatMoney(tx.amount)}</p>${scoreBar(risk)}<footer><button class="ghost-btn approve" data-id="${tx.id}" type="button">Approve</button><button class="primary-btn block" data-id="${tx.id}" type="button">Block</button><button class="ghost-btn escalate" data-id="${tx.id}" type="button">Send for Review</button></footer></article>`;
    })
    .join("");
}

function renderReviewPanel() {
  const flagged = getFlagged();
  $("#reviewList").innerHTML = flagged
    .map((tx) => {
      const risk = riskScore(tx);
      const customer = txCustomer(tx);
      return `<article class="review-card" data-id="${tx.id}"><div class="case-title"><strong>${tx.id}</strong><span class="badge ${risk.level}">${risk.score}%</span></div><h4>${tx.merchant}</h4><p>${customer.name} · ${tx.location}</p>${scoreBar(risk)}<small>${risk.reasons[0]}</small><footer><button class="ghost-btn approve" data-id="${tx.id}" type="button">Approve</button><button class="primary-btn block" data-id="${tx.id}" type="button">Block</button></footer></article>`;
    })
    .join("");
}

function updateStatus(id, status) {
  transactions = transactions.map((tx) => (tx.id === id ? { ...tx, status } : tx));
  toast(`${id} ${status === "review" ? "sent for review" : status}`);
  renderAll();
}

function animateBalance(target) {
  const node = $("#balanceAmount");
  let current = 0;
  const step = target / 45;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    node.textContent = formatMoney(current);
  }, 18);
}

function initCharts() {
  const chartText = getComputedStyle(document.body).getPropertyValue("--muted");
  lineChart = new Chart($("#lineChart"), {
    type: "line",
    data: {
      labels: ["09:00", "09:05", "09:10", "09:15", "09:20", "Now"],
      datasets: [
        {
          label: "Transactions",
          data: [12, 19, 15, 28, 25, 34],
          borderColor: "#244a9b",
          backgroundColor: "rgba(36,74,155,.12)",
          tension: 0.42,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { ticks: { color: chartText } }, y: { ticks: { color: chartText } } },
    },
  });
  donutChart = new Chart($("#donutChart"), {
    type: "doughnut",
    data: {
      labels: ["Retail", "Transfer", "Travel", "Crypto", "Cash"],
      datasets: [
        {
          data: [34, 24, 18, 14, 10],
          backgroundColor: ["#244a9b", "#0f8a5f", "#c27a16", "#c3383f", "#667085"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom", labels: { color: chartText } } },
    },
  });
}

function simulateFeed() {
  if (feedPaused) return;
  const customer = customers[Math.floor(Math.random() * customers.length)];
  const merchants = ["NovaPay", "Airport Lounge", "Global ATM", "Harbor Market", "Swift Crypto"];
  const locations = ["Chicago, US", "Toronto, CA", "Berlin, DE", "Miami, US", "Jakarta, ID"];
  const tx = {
    id: `TX-${Math.floor(Math.random() * 8000 + 1200)}`,
    customerId: customer.id,
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
    merchant: merchants[Math.floor(Math.random() * merchants.length)],
    amount: Math.round(Math.random() * 7200 + 24),
    channel: ["POS Card", "Online", "ATM", "Wire"][Math.floor(Math.random() * 4)],
    location: locations[Math.floor(Math.random() * locations.length)],
    device: Math.random() > 0.55 ? customer.trustedDevices[0] : "Unknown Device",
    status: "review",
    category: ["Retail", "Travel", "Cash", "Crypto", "Transfer"][Math.floor(Math.random() * 5)],
    ipRisk: Math.floor(Math.random() * 100),
    velocity24h: Math.floor(Math.random() * 12) + 1,
  };
  transactions.unshift(tx);
  $("#tpsValue").textContent = (Math.random() * 4 + 1).toFixed(1);
  if (lineChart) {
    lineChart.data.labels.push("Now");
    lineChart.data.labels.shift();
    lineChart.data.datasets[0].data.push(Math.floor(Math.random() * 28 + 8));
    lineChart.data.datasets[0].data.shift();
    lineChart.update();
  }
  renderAll();
}

function exportCsvFile() {
  const header = [
    "id",
    "customer_id",
    "customer_name",
    "date",
    "merchant",
    "amount",
    "channel",
    "location",
    "device",
    "category",
    "ip_risk",
    "velocity_24h",
    "fraud_score",
    "risk_level",
    "status",
  ];
  const rows = filteredTransactions().map((tx) => {
    const customer = txCustomer(tx);
    const risk = riskScore(tx);
    return [
      tx.id,
      tx.customerId,
      customer.name,
      tx.date,
      tx.merchant,
      tx.amount,
      tx.channel,
      tx.location,
      tx.device,
      tx.category,
      tx.ipRisk,
      tx.velocity24h,
      risk.score,
      risk.level,
      tx.status,
    ];
  });
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  downloadBlob(csv, "fraudguard-transactions.csv", "text/csv");
  toast("CSV export downloaded");
}

function exportPdfFile() {
  const rows = filteredTransactions()
    .slice(0, 12)
    .map((tx) => {
      const risk = riskScore(tx);
      const customer = txCustomer(tx);
      return `<tr><td>${tx.id}</td><td>${customer.name}</td><td>${tx.merchant}</td><td>${formatMoney(tx.amount)}</td><td>${risk.score}% ${risk.level}</td><td>${tx.status}</td></tr>`;
    })
    .join("");
  const report = window.open("", "_blank");
  report.document.write(
    `<html><head><title>FraudGuard Risk Report</title><style>body{font-family:Inter,Arial,sans-serif;padding:32px;color:#14213d}h1{margin:0 0 8px}p{color:#667085}table{width:100%;border-collapse:collapse;margin-top:24px}th,td{border-bottom:1px solid #d0d5dd;padding:10px;text-align:left}th{font-size:12px;text-transform:uppercase;color:#667085}.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}.summary div{border:1px solid #d0d5dd;border-radius:12px;padding:14px}</style></head><body><h1>FraudGuard Risk Report</h1><p>Generated ${new Date().toLocaleString()}</p><section class="summary"><div><strong>${filteredTransactions().length}</strong><br/>Filtered records</div><div><strong>${getFlagged().length}</strong><br/>Open alerts</div><div><strong>${$("#avgScore").textContent}</strong><br/>Average fraud score</div></section><table><thead><tr><th>ID</th><th>Customer</th><th>Merchant</th><th>Amount</th><th>Score</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table><script>window.onload=()=>{window.print()}</script></body></html>`,
  );
  report.document.close();
  toast("PDF report opened");
}

function downloadBlob(content, fileName, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}

function toggleReviewPanel(open) {
  $("#reviewPanel").classList.toggle("open", open);
  $("#panelBackdrop").classList.toggle("open", open);
}

function bindEvents() {
  $$(".nav-item").forEach((button) =>
    button.addEventListener("click", () => setPage(button.dataset.page)),
  );
  $$("[data-jump]").forEach((button) =>
    button.addEventListener("click", () => setPage(button.dataset.jump)),
  );
  $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("fg-theme", document.body.classList.contains("dark") ? "dark" : "light");
    toast("Theme updated");
  });
  $("#logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("fg-session");
    location.reload();
  });
  $("#togglePassword").addEventListener("click", () => {
    $("#password").type = $("#password").type === "password" ? "text" : "password";
  });
  $$("[data-auth-tab]").forEach((button) =>
    button.addEventListener("click", () => {
      authMode = button.dataset.authTab;
      $$("[data-auth-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
      $("#confirmGroup").classList.toggle("hidden", authMode === "login");
    }),
  );
  $("#authForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = $("#email").value.trim();
    const password = $("#password").value;
    const confirm = $("#confirmPassword").value;
    if (
      !email.includes("@") ||
      password.length < 6 ||
      (authMode === "signup" && password !== confirm)
    ) {
      $("#authError").textContent =
        "Please enter a valid email and matching password of at least 6 characters.";
      return;
    }
    localStorage.setItem("fg-session", JSON.stringify({ email }));
    $("#loginPage").classList.add("hidden");
    $("#appShell").classList.remove("hidden");
    renderAll();
  });
  ["fraudSearch", "riskFilter", "minAmount"].forEach((id) =>
    $(`#${id}`).addEventListener("input", renderFraudTable),
  );
  document.addEventListener("click", (event) => {
    const txNode = event.target.closest("[data-id]");
    if (txNode && !event.target.closest("button")) {
      selectedTxId = txNode.dataset.id;
      renderSelectedDetails();
      if (txNode.classList.contains("review-card")) setPage("fraud");
    }
    if (event.target.classList.contains("approve"))
      updateStatus(event.target.dataset.id, "approved");
    if (event.target.classList.contains("block")) updateStatus(event.target.dataset.id, "blocked");
    if (event.target.classList.contains("escalate"))
      updateStatus(event.target.dataset.id, "review");
    if (event.target.classList.contains("review-action")) {
      selectedTxId = event.target.dataset.review;
      renderSelectedDetails();
    }
  });
  $("#pauseFeed").addEventListener("click", () => {
    feedPaused = !feedPaused;
    $("#pauseFeed").textContent = feedPaused ? "Resume Feed" : "Pause Feed";
  });
  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    toast("Profile saved");
  });
  $("#alertBell").addEventListener("click", () => toggleReviewPanel(true));
  $("#openReviewPanel").addEventListener("click", () => toggleReviewPanel(true));
  $("#closeReviewPanel").addEventListener("click", () => toggleReviewPanel(false));
  $("#panelBackdrop").addEventListener("click", () => toggleReviewPanel(false));
  $("#globalSearch").addEventListener("input", (event) => {
    $("#fraudSearch").value = event.target.value;
    renderFraudTable();
  });
  $("#exportCsv").addEventListener("click", exportCsvFile);
  $("#exportPdf").addEventListener("click", exportPdfFile);
}

function renderAll() {
  renderDashboard();
  renderFraudTable();
  renderLiveFeed();
  renderCases();
  renderReviewPanel();
  $("#approvedValue").textContent = transactions.filter((tx) => tx.status === "approved").length;
  $("#blockedValue").textContent = transactions.filter((tx) => tx.status === "blocked").length;
}

window.addEventListener("load", () => {
  if (localStorage.getItem("fg-theme") === "dark") document.body.classList.add("dark");
  bindEvents();
  if (localStorage.getItem("fg-session")) {
    $("#loginPage").classList.add("hidden");
    $("#appShell").classList.remove("hidden");
    renderAll();
  }
  setTimeout(() => {
  $("#loader").classList.add("done");
  }, 500);
  setInterval(simulateFeed, 4200);
});
