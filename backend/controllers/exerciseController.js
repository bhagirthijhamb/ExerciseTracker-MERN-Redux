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
  const { name, descritption, duration, date } = req.body;

  try {

  }
}