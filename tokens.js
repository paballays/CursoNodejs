//variables del sistema
const securita= require('dotenv')
securita.config()

const jwt = require('jsonwebtoken')

function generateToken(user) {
  const ustoken = {
   username: user.username,
   id: user.id
  }
  
  return token = jwt.sign(ustoken, process.env.SERCRECTPASS, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  })
}

module.exports = securita