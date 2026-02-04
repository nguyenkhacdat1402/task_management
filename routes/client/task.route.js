const express = require("express");
const controller = require("../../controllers/client/task.controller") 
const authMiddleware = require("../../middlewares/auth.middleware")
const route = express.Router();

route.get("/",authMiddleware.authHome, controller.home)



route.use(authMiddleware.auth)

route.get("/create", controller.create)
route.post("/create", controller.postCreate)

route.get("/detail/:id", controller.detail)

route.get("/edit/:id", controller.edit)
route.patch("/edit/:id", controller.patchEdit)

route.patch("/delete/:id", controller.delete)

route.patch("/change-status/:taskStatus/:idStatus", controller.changeStatus)









module.exports = route