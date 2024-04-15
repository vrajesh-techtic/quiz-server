const { users } = require("../models/userDBSchema");

/*

Required Parameters:

1. email (unique)
2. name

*/

const loginUser = async (req, res) => {
  const userEmail = req.body.userEmail;
  try {
    const query = await users.findOne(
      { email: userEmail },
      { isAuth: 1, _id: 0 }
    );

    if (query.isAuth == true) {
      res.send({ status: true, message: "Valid User!" });
    } else {
      res.send({ status: false, message: "Try logging in with OTP!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const logoutUser = async (req, res) => {
  const userEmail = req.body.userEmail;

  try {
    const query = await users.findOneAndUpdate(
      { email: userEmail },
      { isAuth: false }
    );

    console.log(query);

    if (query != null) {
      res.send({ status: true, message: "User logged out" });
    } else {
      res.send({ status: false, message: "User not found!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = { loginUser, logoutUser };
