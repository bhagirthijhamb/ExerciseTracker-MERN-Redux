const userController = require('../controllers/userController');
const passportService = require('../utils/passport');
const passport = require('passport');
const User = require('../models/userModel');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // app.get('/', function(req, res, next) {
  //   res.send([ 'water', 'fire', 'air' ])
  // })

  // app.get('/', requireAuth, function(req, res){
  //   res.send({ hi: 'there' });
  // })

  app.get('/users', userController.getUsers);

  // before a user can go to the /signin route handler, we requireSignin
  // we have put requireSignin into a middleware (interesting approach)
  // requireSignin will authenticate the user before they hit the route handler
  app.post('/users/signin', requireSignin, userController.signin);

  app.post('/users/signup', userController.signup)
}