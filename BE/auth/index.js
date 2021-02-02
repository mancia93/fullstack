const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../database/configs");
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
          if (!foundUser)
            done(null, false, {
              message: "Did not find a user with this email",
            });
          bcrypt.compare(password, foundUser.password).then(isUser => {
            console.log(isUser);
            if (isUser) done(null, foundUser.dataValues);
          });
        })
        .catch(queryError => console.error(`Query error: ${queryError}`));
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
    },
    (jwtPayload, done) => {
      User.findOne({ where: { email: jwtPayload.email } })
        .then(user => done(null, user.dataValues))
        .catch(jwtError => console.error(`JWT Error: ${jwtError}`));
    }
  )
);
