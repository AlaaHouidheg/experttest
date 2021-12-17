const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");
const isAuth = require("../middleware/auth")

router.get("/", (req, res) => {
  res.send("hello");
});

//register

router.post("/register", registerRules(), validation, async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  // hash password
  const salt = 10;
  const genSalt = await bcrypt.genSalt(salt);
  const hashedPassword = await bcrypt.hash(password, genSalt);

  try {
    const newUser = new User({ name, email, password, isAdmin });
    //check email exist
    const searchedUSer = await User.findOne({ email });
    if (searchedUSer) {
      return res.status(400).send({ msg: "email already exist" });
    }

    newUser.password = hashedPassword;

    const newUserToken = await newUser.save();

    //token
    const payload = {
      _id: newUserToken._id,
      name: newUserToken.name,
    };

    const token = await jwt.sign(payload, process.env.Secret);
    res.status(200).send({ newUserToken, token:`Bearer ${token}`, msg: "user is saved" });
  } catch (error) {
    res.status(400).send({ error, msg: "can not save the user" });
  }
});

// login

router.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body;
  try {
    const searchedUSer = await User.findOne({ email });
    if (!searchedUSer) {
      return res.status(400).send({ msg: "email or password invalide" });
    }

    const match = bcrypt.compare(password, searchedUSer.password);
    if (!match) {
      return res.status(400).send({ msg: "email or password invalide" });
    }

    // token
    const payload = {
      _id: searchedUSer._id,
      name: searchedUSer.name,
    };

    const token = await jwt.sign(payload, process.env.Secret);

    res.send({ user: searchedUSer, token:`Bearer ${token}`, msg: "jawek behy" });
  } catch (error) {
    res.status(500).send("can not get user");
  }
});

//get current user
router.get("/current",isAuth(),(req,res)=>{
res.status(200).send({user:req.user})
})

module.exports = router;
