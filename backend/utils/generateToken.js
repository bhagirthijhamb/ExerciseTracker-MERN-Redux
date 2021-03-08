const jwt = require('jwt-simple');

exports.generateToken = (user) => {
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}