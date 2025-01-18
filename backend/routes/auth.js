require('dotenv').config();
const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//MIDDLEWARE
const logRequest = (req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
}

// MIDDLE WARE TO CHECK IF USER ALREADY EXISTS
const checkUserExists = async (req, res, next) => {
    try {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        return res.status(400).send('Email already exists.');
      }
      next(); // Pass control to the next middleware or route handler
    } catch (error) {
      console.error("Error checking user existence:", error);
      res.status(500).send("An error occurred while checking user existence.");
    }
  };




//ROUTE FOR CREATING NEW USER
router.post('/register', logRequest,checkUserExists, async (req, res) => {
  // Validate the user input against the schema
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
      //Guhindura cq hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creatin new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

    const savedUser = await user.save();
    res.send({user: user._id});

  } catch (error) {
    console.error("Error saving user:", error);
    res.status(400).send(error);
  }
});


//ROUTE FOR LOGGING IN THE EXISTING USER
router.post('/login',logRequest, async (req, res) => {
    const { error } = loginValidation(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    try {
          //Kureba niba user atari muri database
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email or password is wrong.')
        
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Email or password is wrong.')

    // res.send('Logged in successfully!')
    const token = jwt.sign({ _id: user.id },process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    } catch (error) {
        res.status(500).send('An error occurred during login.')
    }
});

module.exports = router;
