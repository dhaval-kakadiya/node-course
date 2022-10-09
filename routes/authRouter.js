const express = require("express");
const router = express.Router();
const passport = require('passport')
const { authorised, notAuthorised } = require("../utils/authManager");

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next).catch(next));
};

const validator = require("../utils/validation");

const {
  login,
  signup,
  getLogin,
  getsignup,
  get404,
  logOut,
  signupVerification,
  sendFile
} = require("../controllers/authController");

// <<<<<<<<< PAge Rendering And Post >>>>>>>>>>>>>>>>>>>
router.get("/login",notAuthorised,  getLogin);
router.post("/login",notAuthorised, passport.authenticate('local',{
      successRedirect: '/dashboard',  
      failureRedirect: '/login',
      failureFlash: true
} ) ,login);

router.get("/404",notAuthorised, get404);

router.get("/signup",notAuthorised,  getsignup);
router.post("/signup",notAuthorised, validator("user"), use(signup));

router.get("/logout",notAuthorised, logOut);

router.get("/signup-verification/:token",notAuthorised, signupVerification);

router.get("/send-file",sendFile )

module.exports = router;
