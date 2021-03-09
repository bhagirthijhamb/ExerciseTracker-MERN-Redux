const exerciseController = require('./../controllers/exerciseController');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.get('/exercises', exerciseController.getExercises);
  app.post('/exercises/add', requireAuth, exerciseController.addExercise);
  app.get('/exercises/:id', requireAuth, exerciseController.getOneExercise);
  app.delete('/exercises/delete/:id', requireAuth, exerciseController.deleteExercise);
  app.put('/exercises/edit/:id', exerciseController.editExercise)
}