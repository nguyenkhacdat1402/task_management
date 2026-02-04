module.exports.postRegister = (req,res,next) => {
    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("/user/register")
        return;
    }

    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("/user/register")
        return;
    }

    if(req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Mật khẩu không khớp")
        res.redirect("/user/register")
        return;
    }

    next()
}

module.exports.postLogin = (req,res,next) => {
    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("/user/login")
        return;
    }

    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("/user/login")
        return;
    }


    next()
}

module.exports.postForgotPassword = (req,res,next) => {
    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("/user/forgot-password")
        return;
    }

    next()
}

module.exports.patchResetPassword = (req,res,next) => {
    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập password")
        res.redirect("/user/reset-password")
        return;
    }

    if(!req.body.confirmPassword) {
        req.flash("error", "Vui lòng nhập confirmPassword")
        res.redirect("/user/reset-password")
        return;
    }

    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Mật khẩu không khớp")
        res.redirect("/user/reset-password")
        return;
    }
    next()
}

