const authentication = require('../controllers/authentication');

module.exports = (app) => {
  app.get('/', function(req, res, next) {
    res.send([ 'water', 'fire', 'air' ])
  })

  app.post('/signup', authentication.signup)
}