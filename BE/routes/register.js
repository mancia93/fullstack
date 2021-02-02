const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/configs");
const User = db.user;

router.post("/", (req, res) => {
  // we are receiving all the user info from a form
  bcrypt
    .hash(req.body.password, 10)
    .then(hashedPassword => {
      // we have our password ready
      // we need to store the user that is being registered in our DB
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword,
        email: req.body.email,
      })
        .then(() =>
          res.status(201).send({ message: "You have succesfuly signed up" })
        )
        .catch(userError => console.error(`User error: ${userError}`));
    })
    .catch(hashError =>
      console.error(
        `Hashing the password had the following errors: ${hashError}`
      )
    );
});

module.exports = router;
