const exerciseController = require('./../controllers/exerciseController');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/exercises', exerciseController.getExercises);
  app.post('/exercises/add', requireAuth, exerciseController.addExercise);
  app.get('/exercises/:id', requireAuth, exerciseController.getOneExercise);
  app.delete('/exercises/:id', requireAuth, exerciseController.deleteExercise)
}