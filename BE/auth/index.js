const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../database/configs");
const bcrypt = require("bcrypt");
const User = db.user;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then(foundUser => {
          //no user found
          if (!foundUser)
            done(null, false, {
              message: `Did not find a user with this email`,
            });
          //user found
          bcrypt.compare(password, foundUser.password).then(isUser => {
            if (isUser) done(null, foundUser.dataValues);
          });
        })
        .catch(queryError => console.error(`Query Error: ${queryError}`));
    }
  )
);
