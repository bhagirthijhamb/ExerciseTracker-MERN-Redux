const Authentication = require('./../controllers/Authentication');

module.exports = (app) => {
  app.get('/', function(req, res, next) {
    res.send([ 'water', 'fire', 'air' ])
  })

  app.post('/signup', Authentication.signup)
}