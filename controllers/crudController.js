const User = require('../models/user');

exports.getDashboard = async (req,res) => {
    const users = await User.find()
    res.render('dashboard',{users});
}