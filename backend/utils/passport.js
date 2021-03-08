const passport = require('passport');
const User = require('./../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  // Verify this username and pssword, call done with the user if it is the correct email and password
  // otherwise, call done with false
  // doing a search is asynchronous, so we provide a callback function
  User.findOne({ email: email }, function(err, user){
    // error in the search
    if(err){ 
      return done(err)
    }
    // user not found 
    // user thinks they have an account but they don't
    if(!user) {
      return done(null, false);
    }

    // compare passwords - is 'password' (supplied by the request by the user) equal to user.passsowrd (from the DB)
  })
})

// Setup options for JWT Strategy
// a JWT can sit anywhere on the request
// on the url, in the body, in the headers of the request
// So need to tell the Strategy where to look for the JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.sub, function(err, user){
    // error in the search
    if(err) {
      return done(err, false);
    }
    if(user){
      // found the user
      done(null, user);
    } else {
      // found no user
      done(null, false)
    }
  })
} )

// Tell passport to use this strategy
passport.use(jwtLogin);