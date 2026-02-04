const  User = require("../../models/user.model")
const Account = require("../../models/account.route")

const bcrypt = require("bcrypt")

//[GET] /admin/accounts/users
module.exports.index = async (req,res) => {
    try {
        const find = {
            deleted: false
        }

        const users = await User.find(find)

        res.render("admin/accounts/user",{
            users: users
        })
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[GET] /admin/accounts/edit
module.exports.edit = async (req,res) => {
    try {
        const id = req.params.id

        const user = await User.findOne({
            _id: id,
            deleted: false
        })

        res.render("admin/accounts/edit",{
            user: user
        })
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[PATCH] /admin/accounts/edit
module.exports.patchEdit = async (req,res) => {
    try {
        const id = req.params.id

        const user = await User.updateOne({
            _id: id,
        },{...req.body})
        req.flash("success", "Cập nhật thành công")
        res.redirect(`/admin/accounts/${id}/edit`)
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[PATCH] /admin/accounts/change-status/:userStatus/:idAccount
module.exports.status = async (req,res) => {
    try {
        const id = req.params.idAccount
        const status = req.params.userStatus

        const user = await User.updateOne({
            _id: id,
        },{
            status: status
        })

        req.flash("success", "Cập nhật thành công")
        res.redirect("/admin/accounts")
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[PATCH] /admin/accounts/delete/:idStatus
module.exports.delete = async (req,res) => {
    try {
        const id = req.params.idStatus

        const user = await User.updateOne({
            _id: id,
        },{
            deleted: true
        })

        req.flash("success", "Xóa user thành công")
        res.redirect("/admin/accounts")
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[GET] /admin/accounts/create
module.exports.create = async (req,res) => {
    try {
        res.render("admin/accounts/create")
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[POST] /admin/accounts/create
module.exports.postCreate = async (req,res) => {
    try {
        const fullName = req.body.fullName
        const email = req.body.email
        const password = await bcrypt.hash(req.body.password, 10)

        const exitEmail = await Account.findOne({
            email: email,
            deleted: false
        })

        if (exitEmail) {
            req.flash("error", "Tài khoản Admin đã tồn tại")
            res.redirect("/admin/accounts/create")
            return
        }

        const account = new Account({
            fullName: fullName,
            email: email,
            password: password
        })
        await account.save()

        req.flash("success", "Tạo tài khoản thành công")
        res.redirect("/admin/accounts/create")
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[GET] /admin/accounts/accountAdmin
module.exports.accountAdmin = async (req,res) => {
    try {
        const find = {
            deleted: false
        }

        const accounts = await Account.find(find)

        res.render("admin/accounts/account",{
            accounts: accounts
        })
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[PATCH] /admin/accounts/change-status-account/:userStatus/:idStatus
module.exports.patchAccountAdmin = async (req,res) => {
    try {
        const id = req.params.accountId
        const status = req.params.accountStatus

        const account = await Account.updateOne({
            _id: id,
        },{
            status: status
        })

        req.flash("success", "Cập nhật thành công")
        res.redirect("/admin/accounts/accountAdmin")
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[PATCH] /admin/accounts/delete/:idStatus
module.exports.deleteAccount = async (req,res) => {
    try {
        const id = req.params.idStatus

        const account = await Account.updateOne({
            _id: id,
        },{
            deleted: true
        })

        req.flash("success", "Xóa Admin thành công")
        res.redirect("/admin/accounts/accountAdmin")
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}

//[GET] /admin/accounts/profile
module.exports.profile = async (req,res) => {
    try {   
        const infoAdmin = await Account.findOne({
            _id: req.user.id
        })

        res.render("admin/accounts/profile",{
            user: infoAdmin
        })
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}