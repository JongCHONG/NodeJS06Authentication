const express = require("express")
const app = express()
const users = require("../user.json")
const { verifyUser } = require("../middlewares/auth")

app.get("/", verifyUser, (req, res) => {
  res.json(users)
})

module.exports = app