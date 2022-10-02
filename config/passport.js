const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user._id);
    }
    return done(null, false);
  });
  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      if (err) return done(null, false);
      delete user._doc.password;
      return done(null, user);
    });
  });

  passport.use(
    "local",
    new LocalStrategy(
      { 
        usernameField: "email", 
        passReqToCallback: true 
      },
      async function (req, username, password, done) {
        console.log(req)
        User.findOne({ email: username }, function (err, user) {
          console.log(user);
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false,{  message: "incorrect username." });
          }
          if(user.password !== password){
            return done(null, false,{  message: "incorrect Password." }) ;
          }
          return done(null, user);
        });
      }
    )
  );
};
