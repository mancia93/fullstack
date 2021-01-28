const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/configs/index");
const User = db.user;

router.post("/", (req, res) => {
  bcrypt
    .hash(req.body.password, 8)
    .then(hashedPassword => {
      User.create({   //User.create => User.findOrCreate
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword,
        email: req.body.email,
      })
        .then(() => res.status(201).send({ message: `You have successfully registered` }))
        .catch(userError => console.error(`User error: ${userError}`));
    })
    .catch(hashError => console.error(`Hashing the password had the following error: ${hashError}`)
    );
});

module.exports = router;
