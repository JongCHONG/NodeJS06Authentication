const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 5000

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

const session = require("express-session")
const passport = require("./config/passport")

const adminRoutes = require("./routes/admin")
const authRoutes = require("./routes/auth")

app.use(express.json())
app.use(morgan("tiny"))

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/admin", adminRoutes)
app.use("/auth", authRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})