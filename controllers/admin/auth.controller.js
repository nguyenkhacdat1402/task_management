const Account = require("../../models/account.route")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//[GET] /admin/auth/login
module.exports.login = (req,res) => {
    try {
        res.render("admin/auth/login")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[POST] /admin/auth/login
module.exports.postLogin = async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await Account.findOne({
            email: email,
            deleted: false
        })

        if (!user) {
            req.flash("error", "Tài khoản không tồn tại")
            res.redirect("/admin/auth/login")
            return
        }

        if (user.status !== "active") {
            req.flash("error", "Tài khoản đã bị khóa")
            res.redirect("/admin/auth/login")
            return
        }

        const isPasswordCorrect = await  bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            req.flash("error", "Mật khẩu không đúng")
            res.redirect("/admin/auth/login")
            return
        }

        const tokenAdmin = jwt.sign({id: user.id, role: user.role, fullName: user.fullName}, process.env.SECRET_KEY, {expiresIn: '2h'})
        res.cookie("tokenAdmin", tokenAdmin)

        res.redirect("/admin/dashboard")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /admin/auth/logout
module.exports.logout = (req,res) => {
    try {
        res.clearCookie("tokenAdmin")
        res.redirect("/admin/dashboard")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}