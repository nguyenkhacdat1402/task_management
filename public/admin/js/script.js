//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-part")

    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ? "inactive" : "active"
            const action = path + `/${statusChange}` + `/${id}?_method=PATCH`
            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}

//delete
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length > 0) {

    const formChangeStatus = document.querySelector("#form-delete-account")
    const path = formChangeStatus.getAttribute("data-part")

    buttonDelete.forEach(button =>{
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id")
            const action = path +`/${id}?_method=PATCH`
            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}