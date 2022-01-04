const express = require("express")
const app = express()
const passport = require("../config/passport")

const fs =  require("fs")
const path = "./users.json"

const { existingUser } = require("../middlewares/auth")
const users = require("../users.json")

app.post('/login', passport.authenticate("local"), (req, res) => {
  if (req.user) {
    req.logIn(req.user, (err) => {
      if (err) {
        res.status(500).send("an error occured")
      }
      res.json(req.user)
    })
  }
})

app.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.post('/signup', existingUser, (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log("error", err)
      // l'erreur arrive coté serveur (typiquement, mauvais chemin de fichier)
      // on renvoie un status 500
      res.status(500).send("Internal server error")
    }
    let users = JSON.parse(data)
    
    users = [...users, newUser]

    fs.writeFile(path, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).send("Internal server error")
      }
    })
  })

  res.json(newUser)
})

module.exports = app