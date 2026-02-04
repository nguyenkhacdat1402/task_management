const express = require('express')
const app = express()
const router = require("./routes/client/index.route")
const adminRouter = require("./routes/admin/index.route")
const database = require("./config/database")
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const methodOverride = require("method-override")
require("dotenv").config()
const port = process.env.PORT

database.connect()

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride("_method"))

app.use(session({
    secret: 'mysecretkey',   
    resave: false,           
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))
app.use(flash())


router(app)
adminRouter(app)

app.get("/", (req,res) => {
  res.render("client/pages/tasks/task")
})

// app.use((req,res,next) => {
//   res.status(404).render("client/pages/error/404")
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
