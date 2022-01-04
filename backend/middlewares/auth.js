const users = require("../users.json")

const verifyUser = (req, res, next) => {
  if (!req.user) { 
    res.status(401).json({error: "Unauthorized"})
  } else {
    next()
  }
}

const existingUser = (req, res, next) => {
  const { username, email } = req.body
  const existingUser = users.find(element => element.username === username || element.email === email)

  if (existingUser) {
    res.status(406).json({error: "Existing User"})
  } else {
    next()
  }
}

module.exports = {
  verifyUser,
  existingUser
}