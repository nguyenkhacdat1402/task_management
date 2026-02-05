//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-part");

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";
      const action = path + `/${statusChange}` + `/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}

//delete
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formChangeStatus = document.querySelector("#form-delete-account");
  const path = formChangeStatus.getAttribute("data-part");

  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const action = path + `/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}




function initDashboard(data) {
  renderUserChart(data.user);
  renderTaskChart(data.task);
}

function renderUserChart(user) {
  const canvas = document.getElementById('userChart');
  if (!canvas) return;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Total','Active', 'Banned'],
      datasets: [{
        data: [user.total, user.active, user.banned],
        backgroundColor: ['#007bff ','#28a745', '#dc3545']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
        beginAtZero: true,
        ticks: {
            precision: 0   
        }
        }
    }
    }
  });
}

function renderTaskChart(task) {
  const canvas = document.getElementById('taskChart');
  if (!canvas) return;

  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ['Finished', 'Pending'],
      datasets: [{
        data: [task.finished, task.pending],
        backgroundColor: ['#28a745', '#ffc107']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

