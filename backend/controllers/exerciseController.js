const Exercise = require('./../models/exerciseModel');

exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch(error){
    next(error);
  }
}

exports.addExercise = async(req, res, next) => {
  const { username, description, duration, date } = req.body;

  try {
    const exercise = new Exercise({
      username,
      description,
      duration,
      date
    })

    const newExercise = await exercise.save();
    res.json(newExercise);
  } catch(error){
    next(error);
  }
}

exports.getOneExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch(err) {
    next(error);
  }
}