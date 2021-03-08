const authentication = require('../controllers/authentication');
const passportService = require('./../utils/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  // app.get('/', function(req, res, next) {
  //   res.send([ 'water', 'fire', 'air' ])
  // })

  app.get('/', requireAuth, function(req, res){
    res.send({ hi: 'there' });
  })

  app.post('/signup', authentication.signup)
}