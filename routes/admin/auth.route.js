const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller")
const adminValidate = require("../../validates/admin/account.validate")


router.get("/login", controller.login)
router.post("/login", adminValidate.postLogin, controller.postLogin)

router.get("/logout", controller.logout)

module.exports = router