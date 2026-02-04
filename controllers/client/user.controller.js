const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const generateHelper = require("../../helpers/generate")
const sendMailHellper = require("../../helpers/sendMail")
const User = require("../../models/user.model")
const Otp = require("../../models/otp.model")

//[GET] /user/register
module.exports.register = (req,res) => {
    try {
        res.render("client/pages/users/register")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[POST] /user/register
module.exports.postRegister = async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const fullName = req.body.fullName

        const exitUser = await User.findOne({
            email: email,
            deleted: false
        })

        if (exitUser) {
            req.flash("error","email already exists")
            res.redirect("/user/register")
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })
        await user.save()

        res.redirect("/user/login")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /user/login
module.exports.login = (req,res) => {
    try {
        res.render("client/pages/users/login")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[POST] /user/login
module.exports.postLogin = async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({
            email: email,
            deleted: false
        })

        if (!user) {
            req.flash("error", "Tài khoản không tồn tại")
            res.redirect("/user/login")
            return;
        }

        if (user.status !== "active") {
            req.flash("error", "Tài khoản đã bị khóa")
            res.redirect("/user/login")
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            req.flash("error", "Mật khẩu không đúng")
            res.redirect("/user/login/")
            return;
        }

        const infoUser = {
            id: user.id,
            fullName : user.fullName,
            email : user.email,
            phone : user.phone
        }
        const token = jwt.sign(infoUser, process.env.SECRET_KEY, ({expiresIn: '12h'}))
        res.cookie("token", token , {
            httpOnly: true,
            secure: false
        })

        res.redirect("/task")
    } catch (error) {
        console.log(error)
        res.send("lỗi hệ thống")
    }
}

//[GET] /user/forgot-password
module.exports.forgotPassword = (req,res) => {
    try {
        res.render("client/pages/users/forgotPassword")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[POST] /user/forgot-password
module.exports.postForgotPassword = async (req,res) => {
    try {
        const email = req.body.email

        const exitEmail = await User.findOne({
            email: email,
            deleted: false
        })

        if (!exitEmail) {
            req.flash("error", "Email không tồn tại")
            res.redirect("/user/forgot-password")
            return
        }

        if (exitEmail.status !== "active") {
            req.flash("error", "Tài khoản đã bị khóa")
            res.redirect("/user/forgot-password")
            return;
        }

        const tokenReset = jwt.sign({email: exitEmail.email}, process.env.SECRET_KEY, {expiresIn: '1h'})
        res.cookie("tokenReset", tokenReset,{
            httpOnly: true,
            secure: false
        })

        const otp = generateHelper.generateRandomNumber(6)
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expiresAt: Date.now()
        }

        const forgotPassword = new Otp(objectForgotPassword)
        await forgotPassword.save()

        const subject = "Ma OTP xac minh lay lai mat khau"
        const html = `<p style="font-size:16px;">
                        Ma OTP de lay lai mat khau la 
                        <b style="color:#dc3545;">${otp}</b>
                    </p>`
        sendMailHellper.sendMail(email, subject, html) 

        res.redirect("/user/otp-password")
    } catch (error) {   
        console.log(error)
        res.send("lỗi hệ thống")
    }
}

//[GET] /user/otp
module.exports.otpPassword = (req,res) => {
    try {
        const email = jwt.verify(req.cookies.tokenReset, process.env.SECRET_KEY).email
        res.render("client/pages/users/otpPassword",{
            email: email
        })
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[POST] /user/otp
module.exports.postOtpPassword = async (req,res) => {
    try {
        const otp = req.body.otp
        const email = req.body.email

        const exitOtp = await Otp.findOne({
            email: email,
            otp: otp
        })

        if (!exitOtp) {
            req.flash("error", "Otp không đúng")
            res.redirect("/user/otp-password")
            return
        }

        res.redirect("/user/reset-password")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /user/resetPassword
module.exports.resetPassword = (req,res) => {
    try {
        res.render("client/pages/users/resetPassword")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[PATCH] /user/resetPassword
module.exports.patchResetPassword = async (req,res) => {
    try {
        const email = jwt.verify(req.cookies.tokenReset, process.env.SECRET_KEY).email
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.updateOne({
            email: email,
            deleted: false
        },{
            password: hashedPassword
        })
        
        res.clearCookie("tokenReset")

        res.redirect("/user/login")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /user/profile
module.exports.profile = async (req,res) => {
    try {
        const user = await User.findOne({
            email: req.user.email
        })


        res.render("client/pages/users/profile",{
            user : user
        })
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /user/settings
module.exports.settings = async (req,res) => {
    try {
        const user = await User.findOne({
            email: req.user.email
        })


        res.render("client/pages/users/settings",{
            user : user
        })
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[PATCH] /user/settings
module.exports.patchSettings = async (req,res) => {
    try {
        const fullName = req.body.fullName
        const phone = req.body.phone
        const email = req.user.email

        const user = await User.updateOne({
            email: email
        },{
            fullName: fullName,
            phone: phone
        })
        req.flash("success", "Cập nhật thông tin thành công")
        res.redirect("/user/settings")

    } catch (error) {
        res.send("lỗi hệ thống")
        console.log(error)
    }
}

//[GET] /user/logout
module.exports.logout = async (req,res) => {
    try {
        res.clearCookie("token")
        res.redirect("/task")
    
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}