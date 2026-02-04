const express = require("express");
const controller = require("../../controllers/client/user.controller") 

const userValidate = require("../../validates/client/user.validate")

const tokenMiddleware = require("../../middlewares/checkResetToken.middleware")
const authMiddleware = require("../../middlewares/auth.middleware")
const   route = express.Router();

route.get("/register", controller.register)
route.post("/register", userValidate.postRegister, controller.postRegister)

route.get("/login", controller.login)
route.post("/login", userValidate.postLogin, controller.postLogin)

route.get("/forgot-password", controller.forgotPassword)
route.post("/forgot-password", userValidate.postForgotPassword, controller.postForgotPassword)

route.get("/otp-password", tokenMiddleware.tokenReset, controller.otpPassword)
route.post("/otp-password", tokenMiddleware.tokenReset, controller.postOtpPassword)

route.get("/reset-password", tokenMiddleware.tokenReset, controller.resetPassword)
route.patch("/reset-password", tokenMiddleware.tokenReset, userValidate.patchResetPassword, controller.patchResetPassword)

route.get("/profile", authMiddleware.auth, controller.profile)

route.get("/settings", authMiddleware.auth, controller.settings)
route.patch("/settings", authMiddleware.auth, controller.patchSettings)

route.get("/logout", controller.logout)

module.exports = route