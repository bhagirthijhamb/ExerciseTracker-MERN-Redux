const authentication = require('../controllers/authentication');
const passportService = require('./../utils/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // app.get('/', function(req, res, next) {
  //   res.send([ 'water', 'fire', 'air' ])
  // })

  app.get('/', requireAuth, function(req, res){
    res.send({ hi: 'there' });
  })

  // before a user can go to the /signin route handler, we requireSignin
  // we have put requireSignin into a middleware (interesting approach)
  // requireSignin will authenticate the user before they hit the route handler
  app.post('/signin', requireSignin, authentication.signin);

  app.post('/signup', authentication.signup)
}