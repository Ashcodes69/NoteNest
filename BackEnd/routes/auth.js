const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "you are a rockstar"; // i have to remove thsis

// ROUTE-1creating a user using post "?api/auth/createUser"--No login required

router.post(
  "/createUser",
  [
    // ensuring that user must enter a valid email and password using --- express-validator

    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "enter a vaiid email").isEmail(),
    body("password", "password is incorrect").isLength({ min: 7 }),
  ],
  async (req, res) => {
    //if there are errors sent bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //cheacking if the user with a same email-id is already exists

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "this email-id is already taken" });
      }

      //creating a secured password for the user

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);
      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });

      // creating and sending authentication token to user

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Enternal server Error");
    }
  }
);

// ROUTE-2 authenticating a user using post "?api/auth/login"--No login required

router.post(
  "/login",
  body("email", "enter a vaiid email").isEmail(),
  body("password", "password cannot be blank").exists(),
  async (req, res) => {
    //if there are errors sent bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    //cheacking if user's email and password is currect or not

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "try to login with currect credantials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "try to login with currect credantials" });
      }

      //sending data after verfing email and password

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Enternal server Error");
    }
  }
);

// ROUTE-3 get loggedin user's data using post "?api/auth/getuser"-- login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Enternal server Error");
  }
});
module.exports = router;
