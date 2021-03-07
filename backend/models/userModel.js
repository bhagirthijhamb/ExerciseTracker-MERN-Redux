const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define user model
const userSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{
  timeStamps: true
})

// Create the model class
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;