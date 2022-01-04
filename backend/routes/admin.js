const express = require("express")
const app = express()
let users = require("../users.json")
const { verifyUser } = require("../middlewares/auth")

const fs =  require("fs")
const path = "./users.json"

app.get("/", verifyUser, (req, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log("error", err)
      // l'erreur arrive coté serveur (typiquement, mauvais chemin de fichier)
      // on renvoie un status 500
      res.status(500).send("Internal server error")
    }
    users = JSON.parse(data)
  })
  res.json(users)
})

module.exports = app