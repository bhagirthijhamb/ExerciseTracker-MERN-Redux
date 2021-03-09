const jwt = require('jwt-simple');
const User = require('../models/userModel');
// const validators = require('./../utils/validators');
const { validateSignupData } = require('../utils/validators');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET)
}

exports.signin = function(req, res, next){
  // User has already has their email and password auth'd
  // We just need to give them a token

  // req.user has value of user that was addded to it by done() callback of passsport
  console.log(req.user);
  res.send({ token: tokenForUser(req.user)});
}

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { valid, errors } = validateSignupData(req.body);

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
    // res.json(newUser);
    res.json({ token: tokenForUser(newUser) });
  } catch (error){
    console.log(error)
    next(error)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (error){
    next(error);
  }
}