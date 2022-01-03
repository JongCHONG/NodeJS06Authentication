const express = require("express")
const morgan = require("morgan")
const app = express()
const port = 5000

const users = require("./routes/users")

app.use(express.json())
app.use(morgan("tiny"))

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})