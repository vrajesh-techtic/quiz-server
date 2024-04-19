const { handleErrors, generateToken } = require("../middleware/authMiddleware");
const { addUserValidation } = require("../middleware/validators");
const { users } = require("../models/userDBSchema");
const { quizzes } = require("../models/quizDBSchema");

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

const isQuizExist = async (quizCode) => {
  try {
    const query = await quizzes.findOne({ quizCode });

    if (query) {
      return { status: true, message: "Quiz exists" };
    } else {
      return { status: false, message: "Quiz not exists" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const addUser = async (req, res) => {
  const isValid = addUserValidation(req.body);

  if (!isValid.error) {
    // Check if user is verified with OTP
    // const resp = await isUserExist(req.body.email);

    const isQuiz = await isQuizExist(req.body.quizCode);
    const isUser = await isUserPresent(req.body.email);
    const attempted = await isQuizAttempted(req.body.email, req.body.quizCode);

    // if (resp.status) {
    const adminData = {
      email: req.body.email,
      name: req.body.name,
      quizCode: req.body.quizCode,
    };

    if (isQuiz.status) {
      try {
        if (isUser) {
          if (attempted) {
            // quiz is already attempted
            res.send({
              status: true,
              isAttempted: true,
              message: "Quiz already attempted by User!",
            });
          } else {
            // add new quiz to existing user
            try {
              const addQuizQuery = await users.findOneAndUpdate(
                { email: req.body.email },
                {
                  $push: { quizzes: req.body.quizCode },
                }
              );

              // console.log("addQuizQuery", );
              if (addQuizQuery) {
                const token = await generateToken(addQuizQuery._id.valueOf());

                res.send({
                  status: true,
                  isAttempted: false,
                  token: token,
                  message: "New quiz added to user's DB!",
                });
              }
            } catch (error) {
              res.status({ status: false, message: error.message });
            }
          }
        } else {
          // Add new user & quiz
          try {
            const addQuery = await users.create(adminData);

            if (addQuery) {
              const token = generateToken(addQuery._id);

              res.send({
                status: true,
                isAttempted: false,
                token: token,
                message: "New User!",
              });
            }
          } catch (error) {
            res.status({ status: false, message: error.message });
          }
        }
      } catch (error) {
        const errors = handleErrors(error);
        res.send({ status: false, message: errors });
      }
    } else {
      res.send(isQuiz);
    }

    // } else {
    //   res.send(resp);
    // }
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

const getQuizData = async (req, res) => {
  try {
    const list = await quizzes.aggregate([
      {
        $match: {
          quizCode: req.body.quizCode,
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "quizCode",
          foreignField: "quizCode",
          as: "questions",
        },
      },
      {
        $unwind: "$questions",
      },
      {
        $group: {
          _id: null,
          allQuestions: {
            $push: {
              ques: "$questions.ques",
              options: "$questions.options",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          allQuestions: 1,
        },
      },
    ]);

    if (list.length !== 0) {
      res.send({ status: true, data: list[0] });
    } else {
      res.send({ status: false, message: "No questions found!" });
    }
  } catch (error) {
    res.send({ status: true, message: error.message });
  }
};

module.exports = { addUser, deleteUser, getUser, getQuizData };
