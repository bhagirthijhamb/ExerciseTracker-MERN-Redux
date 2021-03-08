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

// On Save Hook, encrypt password
// Before saving  a model, run this function
userSchema.pre('save', async function(next) {
  try {
    const user = this;
    if(!user.isModified('password')){
      next();
    }

    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(user.password, salt);

    bcrypt.genSalt(10, (err, salt) => {
      if(err){
        return next(err);
      }

      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if(err){
          return next(err);
        };

        user.password = hash;
        next();
      })
    })

    next();
  } catch (error){
    next(error);
  }
})

userSchema.methods.comparePasswords = function(candiatePassword, callback){
  bcrypt.compare(candiatePassword,this.password, function(err, isMatch){
    if(err){
      return callback(err);
    }
    callback(null, isMatch);
  })
}

// Create the model class
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;