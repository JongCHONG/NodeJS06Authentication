const passport = require("passport")
const passportLocal = require("passport-local")

const LocalStrategy = passportLocal.Strategy

const users = require("../users.json")

passport.use(new LocalStrategy((username, password, done) => {
  console.log(username, password);
  const user = users.find(element => element.username === username && element.password === password)

  if (!user) {
    return done(null, false)
  }

  return done(null, user)
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  const user = users.find(element => element.id === id)
  done(null,user)
})

module.exports = passport