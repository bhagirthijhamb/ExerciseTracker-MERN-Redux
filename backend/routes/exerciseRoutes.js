const exerciseController = require('./../controllers/exerciseController');

module.exports = (app) => {
  app.get('/exercises', exerciseController.getExercises);
  app.post('/exercises/add', exerciseController.addExercise);
}