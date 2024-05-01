const Joi = require("joi");
const { otpDB } = require("../models/otpSchema");
const { demoEmail } = require("../services/emailOTP");

/*

Required Parameters:

1. email (unique)
2. otp

*/

const verifyUser = async (req, res) => {
  try {
    const query = await otpDB.findOne({ email: req.body.email });

    if (!query) {
      res.send({ status: false, message: "User Not Registered!" });
    } else {
      if (query?.isValid) {
        res.send({ status: true, message: "Verified User!" });
      } else {
        res.send({ status: false, message: "User Not Verified!" });
      }
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const isUserExist = async (email) => {
  try {
    const query = await otpDB.findOne({ email });

    if (!query) {
      return {
        status: false,
        message: "User not registered!",
      };
    } else {
      if (query.isValid) {
        return { status: true, message: "Verified User!", statusCode: 200 };
      } else {
        return { status: false, message: "OTP not Verified!!" };
      }
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const sendOTP = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter valid email!",
    }),
  });

  const isValid = schema.validate(req.body);

  if (!isValid.error) {
    const isUserExist = await otpDB.findOne({ email: req.body.email });

    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    if (!isUserExist) {
      // create new document in OTP collection
      try {
        const query = await otpDB.create({
          email: req.body.email,
          otp: otp,
          isValid: false,
        });

        demoEmail(req.body.email, otp);

        res.send({ status: true, message: "OTP sent Successfully!" });
      } catch (error) {
        res.send({ status: false, message: error.message });
      }
    } else {
      // email already exists, replace new OTP only
      try {
        const query = await otpDB.findOneAndUpdate(
          { email: req.body.email },
          { $set: { otp: otp, isValid: false } }
        );

        // send email function
        demoEmail(req.body.email, otp);

        res.send({ status: true, message: "OTP sent Successfully!" });
      } catch (error) {
        res.send({ status: false, message: error.message });
      }
    }
  } else {
    res.send({ status: false, message: isValid.error.details[0].message });
  }
};

const verifyAdminOTP = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().min(1000).max(9999).required().messages({
      "number.min": "Please enter valid OTP!",
      "number.max": "Please enter valid OTP!",
      "number.base": "OTP must be a number!",
    }),
  });

  const isValid = schema.validate(req.body);

  if (!isValid.error) {
    const email = req.body.email;
    const otp = req.body.otp;
    const checkUser = await isUserExist(email);

    if (checkUser?.status) {
      res.send(checkUser);
    } else {
      try {
        const query = await otpDB.findOne({ email: email });

        if (parseInt(query.otp) === parseInt(req.body.otp)) {
          const otpQuery = await otpDB.findOneAndUpdate(
            { email: req.body.email },
            { $set: { otp: null, isValid: true } }
          );

          res.send({
            status: true,
            message: "OTP Verified Successfully!",
          });
        } else {
          res.send({ status: false, message: "Invalid OTP !" });
        }
      } catch (error) {
        res.send({ status: false, message: error.message });
      }
    }
  } else {
    res.send({ status: false, message: isValid.error.details[0] });
  }
};

module.exports = { sendOTP, verifyAdminOTP, verifyUser, isUserExist };
