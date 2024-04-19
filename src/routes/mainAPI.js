const {
  addUser,
  getUser,
  verifyOTP,
  deleteUser,
  getQuizData,
} = require("../controller/usersCrud");
const express = require("express");
const { sendEmail } = require("../services/emailOTP");
const {
  addQuestion,
  getAllQuestions,
  getSpecificQuestion,
  deleteQuestion,
  updateQuestion,
  totalQuestions,
  findQuestion,
} = require("../controller/questionsCRUD");
// const {
//   createQuiz,
//   deleteQuiz,
//   getQuiz,
//   updateQuiz,
// } = require("../controller/quizzesCRUD");
const { loginUser, logoutUser } = require("../controller/participantAuth");
const {
  createDept,
  deptList,
  getQuizList,
  deleteDept,
} = require("../controller/deptCRUD");
const {
  addAdmin,
  updateAdmin,
  getAdmin,
  getDeptList,
  deleteAdmin,
  loginAdmin,
} = require("../controller/adminCRUD");
const {
  sendOTP,
  verifyAdminOTP,
  verifyUser,
} = require("../controller/otpCRUD");
const { generateToken, decryptToken } = require("../middleware/authMiddleware");
const { createQuiz, isQuiz, updateQuiz } = require("../controller/quizzesCRUD");

const routes = express.Router();

routes.post("/add-admin", addAdmin);

routes.post("/login-admin", loginAdmin);

routes.post("/update-admin", updateAdmin);

routes.post("/delete-admin", deleteAdmin);

routes.post("/get-admin", getAdmin);

routes.post("/gen-token", generateToken);

routes.post("/verify-token", decryptToken);

// for sending OTP to send admin OTP Schema
routes.post("/send-otp", sendOTP);

// for sending OTP to verify admin OTP Schema
routes.post("/verify-otp", verifyAdminOTP);

routes.post("/verify-user", verifyUser);

//API to send email
routes.post("/send-email", sendEmail);

//API to create new user
routes.post("/add-user", addUser);

//API to verify otp
// routes.post("/verify-otp", verifyOTP);

// API to get user data
routes.post("/get-user", getUser);

// API to delete user
routes.post("/delete-user", deleteUser);

routes.post("/get-quiz-data", getQuizData);

// API to check whether user is authenticated to access data or not
routes.post("/login-user", loginUser);

// API to remove access from user
routes.post("/logout-user", logoutUser);

// API to add question to database
routes.post("/add-question", addQuestion);

// API to get all questions from database
routes.post("/get-all-questions", getAllQuestions);

routes.get("/count-questions", totalQuestions);

// API to fetch particular question
routes.post("/get-question", getSpecificQuestion);

// API to delete particular question
routes.post("/delete-question", deleteQuestion);

// API to update particular question
routes.post("/update-question", updateQuestion);

routes.post("/find-question", findQuestion);

//API to create new  quiz
routes.post("/create-quiz", createQuiz);

// // API to delete particular quiz
// routes.post("/delete-quiz:id", deleteQuiz);

//API to get quiz data
routes.post("/get-quiz", isQuiz);

// //API to update quiz
routes.post("/update-quiz", updateQuiz);

routes.post("/create-dept", createDept);
routes.post("/delete-dept", deleteDept);

routes.post("/get-dept-list", deptList);

routes.post("/get-library", getDeptList);

routes.post("/get-quiz-list", getQuizList);

module.exports = routes;
