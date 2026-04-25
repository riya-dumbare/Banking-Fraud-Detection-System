const transactions = [
  { id: 'TX-9081', date: '2026-04-25 09:21', merchant: 'Apex Electronics', amount: 248.9, type: 'Card', location: 'New York, US', status: 'approved', user: 'Aisha Smith', category: 'Retail' },
  { id: 'TX-9082', date: '2026-04-25 10:08', merchant: 'Rapid Wire Transfer', amount: 9820, type: 'Wire', location: 'Lagos, NG', status: 'review', user: 'Omar Patel', category: 'Transfer' },
  { id: 'TX-9083', date: '2026-04-25 11:34', merchant: 'Metro Fuel', amount: 72.6, type: 'Card', location: 'Austin, US', status: 'approved', user: 'Nina Brooks', category: 'Travel' },
  { id: 'TX-9084', date: '2026-04-25 02:16', merchant: 'Crypto Bay', amount: 4500, type: 'Online', location: 'Kyiv, UA', status: 'blocked', user: 'Jared Kim', category: 'Crypto' },
  { id: 'TX-9085', date: '2026-04-25 13:12', merchant: 'Fresh Market', amount: 118.22, type: 'Card', location: 'Boston, US', status: 'approved', user: 'Maya Chen', category: 'Groceries' },
  { id: 'TX-9086', date: '2026-04-25 03:41', merchant: 'Luxury Exchange', amount: 12950, type: 'Online', location: 'Dubai, AE', status: 'review', user: 'Eli Turner', category: 'Luxury' },
  { id: 'TX-9087', date: '2026-04-25 14:20', merchant: 'CloudSub Pro', amount: 49, type: 'Online', location: 'Seattle, US', status: 'approved', user: 'Ivy Ross', category: 'Software' },
  { id: 'TX-9088', date: '2026-04-25 04:05', merchant: 'ATM Withdrawal', amount: 2200, type: 'ATM', location: 'Manila, PH', status: 'review', user: 'Lena Ortiz', category: 'Cash' }
];

const alerts = [
  { title: 'Unusual location detected', body: 'Rapid Wire Transfer appeared from Lagos after a US card transaction.' },
  { title: 'High amount anomaly', body: 'Luxury Exchange exceeds this customer\'s usual spend by 740%.' },
  { title: 'Off-hours activity', body: 'Crypto Bay transaction occurred at 02:16 with risky merchant category.' }
];

let authMode = 'login';
let feedPaused = false;
let lineChart;
let donutChart;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function riskScore(tx) {
  let score = 12;
  const reasons = [];
  const hour = Number(tx.date.split(' ')[1].split(':')[0]);
  if (tx.amount > 2000) { score += 32; reasons.push('Amount exceeds normal customer threshold.'); }
  if (tx.amount > 8000) { score += 22; reasons.push('Large transfer requires manual review.'); }
  if (!tx.location.includes('US')) { score += 24; reasons.push('Transaction originated outside the customer home region.'); }
  if (['Crypto', 'Luxury', 'Transfer', 'Cash'].includes(tx.category)) { score += 16; reasons.push('Merchant category is historically higher risk.'); }
  if (hour < 5) { score += 14; reasons.push('Activity occurred during unusual off-hours.'); }
  const level = score >= 70 ? 'high' : score >= 42 ? 'medium' : 'low';
  return { score: Math.min(score, 98), level, reasons: reasons.length ? reasons : ['No suspicious rules triggered.'] };
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function toast(message) {
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  $('#toastStack').appendChild(node);
  setTimeout(() => node.remove(), 3200);
}

function setPage(page) {
  $$('.page').forEach((node) => node.classList.toggle('active-page', node.id === page));
  $$('.nav-item').forEach((node) => node.classList.toggle('active', node.dataset.page === page));
  $('#sidebar').classList.remove('open');
  if (page === 'transactions' && !lineChart) initCharts();
}

function renderDashboard() {
  $('#today').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  $('#flaggedCount').textContent = transactions.filter((tx) => riskScore(tx).level === 'high').length;
  animateBalance(156420.8);
  $('#recentTransactions').innerHTML = transactions.slice(0, 6).map(transactionRow).join('');
  $('#fraudAlerts').innerHTML = alerts.map((alert) => `<article class="alert-row"><strong>${alert.title}</strong><span>${alert.body}</span></article>`).join('');
}

function transactionRow(tx) {
  const risk = riskScore(tx);
  return `<article class="tx-row" data-id="${tx.id}"><div><strong>${tx.merchant}</strong><span>${tx.date} · ${tx.location}</span></div><span class="amount">${formatMoney(tx.amount)}</span><span class="badge ${risk.level}">${risk.level}</span></article>`;
}

function renderFraudTable() {
  const search = $('#fraudSearch').value.toLowerCase();
  const filter = $('#riskFilter').value;
  const min = Number($('#minAmount').value || 0);
  const rows = transactions.filter((tx) => {
    const risk = riskScore(tx);
    const matchesSearch = `${tx.merchant} ${tx.location}`.toLowerCase().includes(search);
    return matchesSearch && tx.amount >= min && (filter === 'all' || risk.level === filter);
  });
  $('#fraudTable').innerHTML = rows.map((tx) => {
    const risk = riskScore(tx);
    return `<tr data-id="${tx.id}"><td>${tx.date}</td><td>${tx.merchant}</td><td>${formatMoney(tx.amount)}</td><td>${tx.type}</td><td>${tx.location}</td><td><span class="badge ${risk.level}">${risk.score}% ${risk.level}</span></td><td><span class="badge ${tx.status}">${tx.status}</span></td></tr>`;
  }).join('');
}

function renderLiveFeed() {
  $('#liveFeed').innerHTML = transactions.slice(0, 7).map(transactionRow).join('');
}

function renderCases() {
  const flagged = transactions.filter((tx) => riskScore(tx).level !== 'low');
  $('#caseCards').innerHTML = flagged.map((tx) => {
    const risk = riskScore(tx);
    return `<article class="case-card"><strong>${tx.id} · ${tx.merchant}</strong><p>${tx.user} · ${tx.location} · ${formatMoney(tx.amount)}</p><span class="badge ${risk.level}">${risk.score}% ${risk.level}</span><footer><button class="ghost-btn approve" data-id="${tx.id}" type="button">Approve</button><button class="primary-btn block" data-id="${tx.id}" type="button">Block</button></footer></article>`;
  }).join('');
}

function openTransaction(id) {
  const tx = transactions.find((item) => item.id === id);
  if (!tx) return;
  const risk = riskScore(tx);
  $('#modalContent').innerHTML = `<h2>${tx.merchant}</h2><p>${tx.id} · ${tx.user}</p><h3>${formatMoney(tx.amount)} <span class="badge ${risk.level}">${risk.score}% ${risk.level}</span></h3><p><strong>Location:</strong> ${tx.location}</p><p><strong>Type:</strong> ${tx.type}</p><p><strong>Status:</strong> ${tx.status}</p><h3>Risk Explanation</h3><ul>${risk.reasons.map((reason) => `<li>${reason}</li>`).join('')}</ul>`;
  $('#transactionModal').showModal();
}

function animateBalance(target) {
  const node = $('#balanceAmount');
  let current = 0;
  const step = target / 45;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    node.textContent = formatMoney(current);
  }, 18);
}

function initCharts() {
  const chartText = getComputedStyle(document.body).getPropertyValue('--muted');
  lineChart = new Chart($('#lineChart'), {
    type: 'line',
    data: { labels: ['09:00', '09:05', '09:10', '09:15', '09:20', 'Now'], datasets: [{ label: 'Transactions', data: [12, 19, 15, 28, 25, 34], borderColor: '#4f7cff', backgroundColor: 'rgba(79,124,255,.16)', tension: .42, fill: true }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: chartText } }, y: { ticks: { color: chartText } } } }
  });
  donutChart = new Chart($('#donutChart'), {
    type: 'doughnut',
    data: { labels: ['Retail', 'Transfer', 'Travel', 'Crypto'], datasets: [{ data: [42, 22, 18, 18], backgroundColor: ['#4f7cff', '#18a058', '#d88915', '#e5484d'], borderWidth: 0 }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: chartText } } } }
  });
}

function simulateFeed() {
  if (feedPaused) return;
  const merchants = ['NovaPay', 'Airport Lounge', 'Global ATM', 'Harbor Market', 'Swift Crypto'];
  const locations = ['Chicago, US', 'Toronto, CA', 'Berlin, DE', 'Miami, US', 'Jakarta, ID'];
  const tx = {
    id: `TX-${Math.floor(Math.random() * 8000 + 1200)}`,
    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    merchant: merchants[Math.floor(Math.random() * merchants.length)],
    amount: Math.round(Math.random() * 7200 + 24),
    type: ['Card', 'Online', 'ATM', 'Wire'][Math.floor(Math.random() * 4)],
    location: locations[Math.floor(Math.random() * locations.length)],
    status: 'review',
    user: 'Live Customer',
    category: ['Retail', 'Travel', 'Cash', 'Crypto'][Math.floor(Math.random() * 4)]
  };
  transactions.unshift(tx);
  renderLiveFeed();
  renderFraudTable();
  $('#tpsValue').textContent = (Math.random() * 4 + 1).toFixed(1);
  if (lineChart) {
    lineChart.data.labels.push('Now');
    lineChart.data.labels.shift();
    lineChart.data.datasets[0].data.push(Math.floor(Math.random() * 28 + 8));
    lineChart.data.datasets[0].data.shift();
    lineChart.update();
  }
}

function bindEvents() {
  $$('.nav-item').forEach((button) => button.addEventListener('click', () => setPage(button.dataset.page)));
  $$('[data-jump]').forEach((button) => button.addEventListener('click', () => setPage(button.dataset.jump)));
  $('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
  $('#themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('fg-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    toast('Theme updated');
  });
  $('#logoutBtn').addEventListener('click', () => { localStorage.removeItem('fg-session'); location.reload(); });
  $('#togglePassword').addEventListener('click', () => { $('#password').type = $('#password').type === 'password' ? 'text' : 'password'; });
  $$('[data-auth-tab]').forEach((button) => button.addEventListener('click', () => {
    authMode = button.dataset.authTab;
    $$('[data-auth-tab]').forEach((tab) => tab.classList.toggle('active', tab === button));
    $('#confirmGroup').classList.toggle('hidden', authMode === 'login');
  }));
  $('#authForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = $('#email').value.trim();
    const password = $('#password').value;
    const confirm = $('#confirmPassword').value;
    if (!email.includes('@') || password.length < 6 || (authMode === 'signup' && password !== confirm)) {
      $('#authError').textContent = 'Please enter a valid email and matching password of at least 6 characters.';
      return;
    }
    localStorage.setItem('fg-session', JSON.stringify({ email }));
    $('#loginPage').classList.add('hidden');
    $('#appShell').classList.remove('hidden');
    renderAll();
  });
  ['fraudSearch', 'riskFilter', 'minAmount'].forEach((id) => $(`#${id}`).addEventListener('input', renderFraudTable));
  document.addEventListener('click', (event) => {
    const txNode = event.target.closest('[data-id]');
    if (txNode && (txNode.classList.contains('tx-row') || txNode.tagName === 'TR')) openTransaction(txNode.dataset.id);
    if (event.target.classList.contains('approve')) toast(`${event.target.dataset.id} approved`);
    if (event.target.classList.contains('block')) toast(`${event.target.dataset.id} blocked`);
  });
  $('#closeModal').addEventListener('click', () => $('#transactionModal').close());
  $('#pauseFeed').addEventListener('click', () => { feedPaused = !feedPaused; $('#pauseFeed').textContent = feedPaused ? 'Resume Feed' : 'Pause Feed'; });
  $('#profileForm').addEventListener('submit', (event) => { event.preventDefault(); toast('Profile saved'); });
  $('#alertBell').addEventListener('click', () => toast('3 fraud alerts are waiting for review'));
  $('#globalSearch').addEventListener('input', (event) => { $('#fraudSearch').value = event.target.value; renderFraudTable(); });
}

function renderAll() {
  renderDashboard();
  renderFraudTable();
  renderLiveFeed();
  renderCases();
}

window.addEventListener('load', () => {
  if (localStorage.getItem('fg-theme') === 'dark') document.body.classList.add('dark');
  bindEvents();
  if (localStorage.getItem('fg-session')) {
    $('#loginPage').classList.add('hidden');
    $('#appShell').classList.remove('hidden');
    renderAll();
  }
  setTimeout(() => $('#loader').classList.add('done'), 450);
  setInterval(simulateFeed, 4200);
});
