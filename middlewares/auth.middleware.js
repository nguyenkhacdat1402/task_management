const jwt = require("jsonwebtoken")
module.exports.auth = (req,res,next) => {
    const token = req.cookies.token
    if (!token) {
        res.redirect("/user/login")
        return;
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decode
    res.locals.user = decode
    next()
}

module.exports.authHome = (req,res,next) => {
        const token = req.cookies.token
        if (!token) {
            res.render("client/pages/tasks/task")
            return
        }
        
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
}