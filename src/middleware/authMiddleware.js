const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const handleErrors = (errors) => {
  let errorMsg = "";

  if (errors.code === 11000) {
    errorMsg = "User already exists!";
  } else {
    errorMsg = errors.details[0].message;
  }

  return errorMsg;
};

const generateToken = (id) => {
  console.log("SCERET_KEY", SECRET_KEY);

  const encryptedToken = jwt.sign(id, SECRET_KEY);
  return encryptedToken;
};

const decryptToken = (token) => {
  const decryptedToken = jwt.verify(token, SECRET_KEY);
  if (decryptToken) {
    return { status: true, token: decryptedToken };
  } else {
    return { status: false, message: "Invalid token!" };
  }
};

module.exports = { handleErrors, generateToken, decryptToken };
