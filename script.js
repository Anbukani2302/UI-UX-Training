const attendanceCtx = document.getElementById("attendanceChart").getContext("2d");
new Chart(attendanceCtx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "Present",
      data: [100, 110, 108, 115, 112],
      borderColor: "#00b4d8",
      fill: false
    }]
  }
});

const salaryCtx = document.getElementById("salaryChart").getContext("2d");
new Chart(salaryCtx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Salary Paid",
      data: [240000, 260000, 250000, 280000, 270000],
      backgroundColor: "#90e0ef"
    }]
  }
});
