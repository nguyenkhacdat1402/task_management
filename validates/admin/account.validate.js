module.exports.postCreate = (req,res,next) => {
    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("/admin/accounts/create")
        return;
    }

    if(!req.body.fullName) {
        req.flash("error", "Vui lòng nhập fullName")
        res.redirect("/admin/accounts/create")
        return;
    }

    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("/admin/accounts/create")
        return;
    }

    next()
}

module.exports.postLogin = (req,res,next) => {
    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect("/admin/auth/login")
        return;
    }
    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect("/admin/auth/login")
        return;
    }

    next()
}
