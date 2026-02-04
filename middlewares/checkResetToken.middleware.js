module.exports.tokenReset = (req,res,next) => {
    const tokenReset = req.cookies.tokenReset
    if (!tokenReset) {
        req.flash("Đừng nghịch lung tung")
        res.redirect("/user/forgot-password")
    }

    next()
}