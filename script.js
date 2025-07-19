function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    sidebar.classList.toggle("mobile-active");
  } else {
    sidebar.classList.toggle("collapsed");
  }
}

function loadPage(page) {
  const main = document.getElementById("main-content");
  if (page === 'dashboard') {
    main.innerHTML = `
      <button class="toggle-btn" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
      </button>

      <div class="cards">
        <div class="card">Total Balance<br><strong>$1,200,000</strong></div>
        <div class="card">Active Loans<br><strong>$530,000</strong></div>
        <div class="card">Accounts<br><strong>420</strong></div>
        <div class="card">Branches<br><strong>8</strong></div>
      </div>

      <div class="charts">
        <div class="chart"><canvas id="barChart"></canvas></div>
        <div class="chart"><canvas id="pieChart"></canvas></div>
        <div class="chart"><canvas id="lineChart"></canvas></div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Account No</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Kannan</td><td>123456789</td><td>$50,000</td><td>Active</td></tr>
            <tr><td>Anbukani</td><td>987654321</td><td>$30,000</td><td>Inactive</td></tr>
            <tr><td>Sabarish</td><td>456123789</td><td>$70,000</td><td>Active</td></tr>
            <tr><td>Kavimithra</td><td>456123789</td><td>$50,000</td><td>Active</td></tr>
          </tbody>
        </table>
      </div>`;
    setTimeout(initializeCharts, 0);
  } else if (page === 'reports') {
    main.innerHTML = `
      <h1>Monthly Report</h1>
      <canvas id="reportChart" width="400" height="200"></canvas>
      <a href="#" onclick="loadPage('dashboard')">&larr; Back to Dashboard</a>`;
    setTimeout(() => {
      const ctx = document.getElementById('reportChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{
            label: 'Revenue',
            data: [12000, 15000, 14000, 17000],
            borderColor: '#0d47a1',
            borderWidth: 2,
            fill: false
          }]
        }
      });
    }, 0);
  } else if (page === 'customers') {
    main.innerHTML = `<h1>Customers</h1><p>Customer list will appear here.</p>`;
  } else if (page === 'accounts') {
    main.innerHTML = `<h1>Accounts</h1><p>Account data will be shown here.</p>`;
  }
}

function initializeCharts() {
  const barCanvas = document.getElementById("barChart");
  if (barCanvas) {
    new Chart(barCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [{
          label: "Deposits",
          data: [30000, 40000, 25000, 50000],
          backgroundColor: "#42a5f5",
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }

  const pieCanvas = document.getElementById("pieChart");
  if (pieCanvas) {
    new Chart(pieCanvas.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Loans", "Deposits", "Savings"],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ["#66bb6a", "#42a5f5", "#ffa726"]
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  }

  const lineCanvas = document.getElementById("lineChart");
  if (lineCanvas) {
    new Chart(lineCanvas.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [{
          label: "Loan Growth",
          data: [10000, 20000, 15000, 30000],
          borderColor: "#ef5350",
          fill: false,
          tension: 0.3
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
}

window.onload = () => loadPage('dashboard');
