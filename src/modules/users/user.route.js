const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../../common/config');
const jwt = require('jsonwebtoken');

const User = require('./user.schema');

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then((user) => {
    if (user) res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      name,
      email,
      password,
    });
    
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
