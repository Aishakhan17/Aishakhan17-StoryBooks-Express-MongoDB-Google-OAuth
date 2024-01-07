const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan") //for login
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db") 







//Load Config
dotenv.config({path: "./config/config.env"})


//Passport config
require("./config/passport")(passport)

//Connect DB
connectDB()

const app = express()

//Body Parser middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Method override middleware
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

//Handlebars helpers
const { formatDate, truncate, stripTags, editIcon, select } = require("./helpers/hbs")


//handlebars middleware
app.engine('.hbs', exphbs.engine({helpers: {formatDate, truncate, stripTags, editIcon, select} ,defaultLayout: "main", extname: '.hbs'}));
app.set('view engine', '.hbs');

//Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


//Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

//static folder
app.use(express.static(path.join(__dirname, "public")))


//Routes

app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))

//Protect Endpoints 
app.get('/api/me',
  passport.authenticate('token', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))