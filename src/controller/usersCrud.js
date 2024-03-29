const { users } = require("../models/userDBSchema");
const { demoEmail } = require("../services/emailOTP");

// Function to add user
const addUser = async (req, res) => {
  const obj = req.body;
  const userName = obj.userName;
  const userEmail = obj.userEmail;
  const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);

  try {
    const query = await users.findOne({
      email: userEmail,
    });

    // For new User
    if (query === null) {
      const addUserResponse = await users.create({
        email: userEmail,
        name: userName,
        isAuth: true,
        otp: [otp],
      });

      res.send({
        status: true,
        message: "User added to database!",
        statusCode: 200,
      });
    }
    // For existing user
    else {
      const addOTP = await users.findOneAndUpdate(
        { email: userEmail },
        {
          $push: { otp: otp },
        },
        {
          new: true,
        }
      );
      res.send({
        status: true,
        message: "OTP added to database!",
        statusCode: 200,
      });
    }

    demoEmail(userEmail, otp);
  } catch (error) {
    // If any error occurs
    res.send({
      status: false,
      message: error.message,
      statusCode: 404,
    });
  }
};

// Function to verify otp
const verifyOTP = async (req, res) => {
  const userEmail = req.body.userEmail;
  const otp = req.body.otp;

  try {
    const query = await users.findOne({
      email: userEmail,
    });

    if (query.otp[query.otp.length - 1] === otp) {
      await users.findOneAndUpdate(
        { email: userEmail },
        {
          $set: { otp: [] },
          isAuth: true,
        }
      );
      res.send({
        status: true,
        message: "OTP Verified Successfully!",
        statusCode: 200,
      });
    } else {
      res.send({ status: false, message: "Invalid OTP !", statusCode: 500 });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ status: false, message: error.message, statusCode: 400 });
  }
};

// Function to fetch user data
const getUser = async (req, res) => {
  const userEmail = req.body.userEmail;
  try {
    const query = await users.findOne(
      {
        email: userEmail,
      },
      { email: 1, name: 1, _id: 0 }
    );

    if (query) {
      res.send({ status: true, data: query });
    }
  } catch (error) {
    console.error(error.message);
    res.send({
      status: false,
      message: error.message,
      statusCode: error.code,
    });
  }
};

// Function to delete user data
const deleteUser = async (req, res) => {
  const userEmail = req.body.userEmail;

  try {
    const query = await users.deleteOne({ email: userEmail });

    if (query.deletedCount != 0) {
      res.send({ status: true, message: "User Removed from Database" });
    } else {
      res.send({ status: false, message: "User does not exists" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ status: false, message: error.message });
  }
};

module.exports = { addUser, deleteUser, verifyOTP, getUser };
