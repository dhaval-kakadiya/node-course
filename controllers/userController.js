const User = require("../models/user");
const CronJob = require("cron").CronJob;
const { ObjectID } = require("bson");

exports.addUser = async (req, res) => {
  try {
    const user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = req.body.password;

    const userData = await user.save();
    if (userData) {
      return res.status(200).json({
        success: true,
        message: "User Successfully ADD",
        data: userData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User Not Register",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json({
      success: true,
      message: "User Successfully Read",
      data: allUser,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User Read Failed",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.aggregate([
      {
        $match: {
          _id: ObjectID(id)
        },
      },
      { $project: { first_name: 1 } },
    ]);

    return res.status(200).json({
      success: true,
      message: "User Successfully Read By ID",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User Read Failed",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });

    return res.status(200).json({
      success: true,
      message: "User Successfully Update By ID",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User Update Failed",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, { is_delete: true });

    return res.status(200).json({
      success: true,
      message: "User Successfully Deleted",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User Not Delete",
    });
  }
};

const job = new CronJob("*/3 * * * *", async function () {
  let deleteQuery = { verified: false };
  // const user = await User.deleteMany(deleteQuery)
  // const d = new Date();
  // console.log('At Every Second:', d.toLocaleTimeString());
  // console.log('Deleted User' , user);
});

job.start();
