const express = require('express');
const USER = require('../models/User');
const fetchUser = require('./middleware/fetchUser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Himagshu$boy';


// Route1 : Create a user using : POST "/api/auth/createuser". Doesn't require Auth 
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Minimum of 8 charachters').isLength({ min: 8 })
], async (req, res) => {

  let success = false;

  // If there are errors, return bad requests and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  // Check whether the user with this email exists already
  try {
    let user = await USER.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: "Sorry, a user with this email already exists." })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Create new user
    user = await USER.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      date: req.body.date
    })

    // then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
    // res.json({ msg: "Successfully added user !" });


    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    // res.json({user, authToken});
    success = true;
    res.json({ success, authToken });
  }

  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured !");
  }
})


// Route2 : Authenticate a USER using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be empty').exists(),
], async (req, res) => {

  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await USER.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Wrong credentials" });
    }

    const psswrdCmpr = await bcrypt.compare(password, user.password);
    if (!psswrdCmpr) {
      return res.status(400).json({ success, error: "Wrong credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error !");
  }

})


// Route3 : Get loggedIn USER details using : POST "/api/auth/login". No login required
router.post('/getUser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await USER.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error !");
  }
})


module.exports = router