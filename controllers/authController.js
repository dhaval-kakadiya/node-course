const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PW,
  },
});

exports.getsignup = (req, res) => {
  res.render("signup");
};

exports.getLogin = (req, res) => {
  const success = req.flash("success");
  const error = req.flash("error");
  console.log(success,error);
  res.render("login", { success, error });
};

exports.get404 = (req, res) => {
  res.render("error404");
};

// <<<<<<<<<<<<<<<<<<<<<<<< SIGN-UP >>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.signup = async (req, res) => {
  try {
    const user = new User();
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, 12);
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = hashPassword;

    const userData = await user.save();

    if (!userData) {
      return res.status(422).json({
        success: false,
        message: "failed to signup",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    // for mail

    let info = await transporter.sendMail({
      // from: '<instagram@gmail.com>', // sender address
      to: "deepakkumarn086747@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      // text: "Node Js", // plain text body
      // html:  `<b> You Are Successfull Register Try To Login </b>`, // html body
      html: `<a href="http://localhost:3000/signup-verification/${token}"> Click here to verify your email </a>`,
    });

    console.log(info);

    req.flash("success", "register successfully pls verify your email within 5 Minutes");

    return res.status(200).redirect("/login");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<< LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.login = async (req, res) => {
  try {
    // const {email, password} = req.body;

    // const user = await User.findOne({ email, verified: true });

    // if (!user) {
    //   return res.status(422).redirect("/signup");
    // }

    // const matchPw = await bcrypt.compare(password, user.password);

    // if (!matchPw) {
    //   return res.status(422).redirect("/login");
    // }

    // req.session.user = user.email;

    return res.status(200).redirect("/dashboard");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Login Failed !!",
      message: error.message,
    });
  }
};

// <<<<<<<<<<<<<<<<<<<<<<< LOG-OUT >>>>>>>>>>>>>>>>>
exports.logOut = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch {
    return res.status(404).json({
      success: false,
      message: "You Are Not Log-Out",
    });
  }
};
exports.signupVerification = async (req, res) => {
  try {
    const { token } = req.params;
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    const { email } = decodeToken;

    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/signup");
    }

    user.verified = true;

    await user.save();

    return res.status(200).redirect("/login");
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User Read Failed",
    });
  }
};
