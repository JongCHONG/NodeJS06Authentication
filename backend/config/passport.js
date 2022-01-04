const passport = require("passport")
const passportLocal = require("passport-local")

const LocalStrategy = passportLocal.Strategy

const fs =  require("fs")
const path = "./users.json"

let users = require("../users.json")

passport.use(new LocalStrategy((username, password, done) => {
  // console.log(username, password);
  
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log("error", err)
      // l'erreur arrive coté serveur (typiquement, mauvais chemin de fichier)
      // on renvoie un status 500
      res.status(500).send("Internal server error")
    }
    users = JSON.parse(data)
    
    const user = users.find(element => element.username === username && element.password === password)
    
    if (!user) {
      return done(null, false)
    }
  
    return done(null, user)
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  const user = users.find(element => element.id === id)
  done(null,user)
})

module.exports = passport