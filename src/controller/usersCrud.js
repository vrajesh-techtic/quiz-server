const { handleErrors } = require("../middleware/authMiddleware");
const { addUserValidation } = require("../middleware/validators");
const { users } = require("../models/userDBSchema");
const { demoEmail } = require("../services/emailOTP");
const { isUserExist } = require("./otpCRUD");

const isUserPresent = async (email) => {
  const isPresent = await users.findOne({
    email,
  });
  if (isPresent !== null) {
    return true;
  } else {
    return false;
  }
};

const isQuizAttempted = async (email, quizCode) => {
  const isValid = await users.findOne({
    email: email,
    quizzes: { $in: quizCode },
  });

  if (isValid !== null) {
    return true;
  } else {
    return false;
  }
};

const addUser = async (req, res) => {
  const isValid = addUserValidation(req.body);

  if (!isValid.error) {
    // Check if user is verified with OTP
    const resp = await isUserExist(req.body.email);

    if (resp.status) {
      const adminData = {
        email: req.body.email,
        name: req.body.name,
        quizCode: req.body.quizCode,
      };

      try {
        if (await isUserPresent(req.body.email)) {
          if (await isQuizAttempted(req.body.email, req.body.quizCode)) {
            res.send({ status: true, message: "User have attempted quiz!" });
          } else {
            const addQuizQuery = await users.findOneAndUpdate(
              { email: req.body.email },
              {
                $push: { quizzes: req.body.quizCode },
              }
            );
            res.send({
              status: true,
              message: "New quiz added to user's DB!",
            });
          }
        } else {
          const addQuery = await users.create(adminData);

          res.send({ status: true, message: "new User!" });
        }
      } catch (error) {
        const errors = handleErrors(error);
        res.send({ status: false, message: errors });
      }
    } else {
      res.send(resp);
    }
  } else {
    const errors = handleErrors(isValid.error);
    res.send({ status: false, message: errors });
  }
};

// Function to add user
// const addUser = async (req, res) => {
//   const obj = req.body;
//   const userName = obj.userName;
//   const userEmail = obj.userEmail;
//   const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);

//   try {
//     const query = await users.findOne({
//       email: userEmail,
//     });

//     // For new User
//     if (query === null) {
//       const addUserResponse = await users.create({
//         email: userEmail,
//         name: userName,
//         isAuth: true,
//         otp: [otp],
//       });

//       res.send({
//         status: true,
//         message: "User added to database!",
//         statusCode: 200,
//       });
//     }
//     // For existing user
//     else {
//       const addOTP = await users.findOneAndUpdate(
//         { email: userEmail },
//         {
//           $push: { otp: otp },
//         },
//         {
//           new: true,
//         }
//       );
//       res.send({
//         status: true,
//         message: "OTP added to database!",
//         statusCode: 200,
//       });
//     }

//     demoEmail(userEmail, otp);
//   } catch (error) {
//     // If any error occurs
//     res.send({
//       status: false,
//       message: error.message,
//       statusCode: 404,
//     });
//   }
// };

// Function to verify otp

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

module.exports = { addUser, deleteUser, getUser };
