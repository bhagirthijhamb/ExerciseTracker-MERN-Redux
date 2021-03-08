const User = require('../models/userModel');
const validators = require('./../utils/validators');
// const { validateSignupData } = require('./../utils/validators');

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { valid, errors } = validators.validateSignupData(req.body);

  if(!valid) {
    return res.status(422).json(errors);
  }
  
  try {
    // See if a user with the given email exists
    const existingUser = await User.findOne({ email: email });
    
    // If a user with email exist, return an error
    // if the user with email already exist,existingUser will have its value
    // otherwise existingUserwill have null as its value
    if(existingUser){
      return res.status(422).send({ error: 'Email is in use' })
    }

    // If a user with email DOES NOT exits, create and save  user record
    const user = new User({
      name: name,
      email: email,
      password: password
    })

    const newUser = await user.save()

    // Repond to the request  indicating the user was created
    res.json(newUser);
  } catch (error){
    // console.log(error)
    next(error)
  }
}