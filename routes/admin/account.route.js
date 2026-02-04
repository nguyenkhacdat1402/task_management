const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/user.controller")
const accountValidate = require("../../validates/admin/account.validate")
const adminMiddleware = require("../../middlewares/admin/auth.middleware")

router.get("/", controller.index)

router.get("/:id/edit", controller.edit)

router.patch("/:id", controller.patchEdit)
router.patch("/change-status/:userStatus/:idAccount", controller.status)

router.patch("/delete/:idStatus", controller.delete)


router.get("/create", controller.create)
router.post("/create", accountValidate.postCreate, controller.postCreate)

router.get("/accountAdmin", adminMiddleware.authorizationAdmin , controller.accountAdmin)
router.patch("/change-status-account/:accountStatus/:accountId", adminMiddleware.authorizationAdmin , controller.patchAccountAdmin)
router.patch("/deleteAccount/:idStatus", controller.deleteAccount)


router.get("/profile", controller.profile)





module.exports = router