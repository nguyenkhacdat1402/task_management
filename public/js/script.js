// hidden alert
document.addEventListener("DOMContentLoaded", () => {
  const showAlert = document.querySelector("[show-alert]");

  if (showAlert) {
    const time = showAlert.getAttribute("data-time");
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
      showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
});


const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus) {
  const url = new URL(window.location.href)
  buttonStatus.forEach(button => {
    button.addEventListener("click", ()=>{
        const status = button.getAttribute("button-status")
        if (status) {
          url.searchParams.set("status", status)
        }else{
          url.searchParams.delete("status")
        }   
        window.location.href = url.href
    })
  })
} 


//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-part")

    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "finish" ? "pending" : "finish"
            const action = path + `/${statusChange}` + `/${id}?_method=PATCH`
            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteForms = document.querySelectorAll(".delete-task-form");

  deleteForms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (confirm("Bạn chắc muốn xoá?")) {
        this.submit();
      }
    });
  });
});

