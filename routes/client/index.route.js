const taskRoute = require("../client/task.route")
const userRoute = require("../client/user.route")

module.exports = (app) => {
    app.use("/task", taskRoute)
    app.use("/user", userRoute)
}