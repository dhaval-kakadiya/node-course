const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/crudController");
const { authorised } = require("../utils/authManager");

router.get("/", authorised, getDashboard);
router.get("/logout", authorised, async (req, res) => {
    const isLogout = await logout(req)
    if(isLogout) {
        res.redirect('/login')
    }
});

module.exports = router;

const logout = async (req) => {
  return new Promise((resolve, reject) => {
    req.logout(function (err) {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};
