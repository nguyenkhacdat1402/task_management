const dashboardRoute = require("./dashboard.route")
const accountRoute = require("./account.route")
const authRoute = require("./auth.route")
const adminMiddleware = require("../../middlewares/admin/auth.middleware")

module.exports = (app) => {
    app.use("/admin/dashboard",adminMiddleware.authenticationAdmin, dashboardRoute)
    app.use("/admin/accounts",adminMiddleware.authenticationAdmin, accountRoute)
    app.use("/admin/auth",  authRoute)
}