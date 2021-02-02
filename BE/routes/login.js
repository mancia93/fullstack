const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) res.status(500).send(err);
    if (!user) res.status(400).send(info);
    // generate the token with a secret coming from .env
    const token = jwt.sign(JSON.stringify(user), process.env.APP_SECRET);
    // create the user object we will send with the proper naming
    const securedFinalUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
    return res.status(200).send({ securedFinalUser, token });
  })(req, res, next);
});

module.exports = router;
