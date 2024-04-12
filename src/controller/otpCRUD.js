const Joi = require("joi");
const { otpDB } = require("../models/otpSchema");
const { demoEmail } = require("../services/emailOTP");

const sendOTP = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const isValid = schema.validate(req.body);

  if (!isValid.error) {
    const isUserExist = await otpDB.findOne({ email: req.body.email });

    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    if (!isUserExist) {
      try {
        const query = await otpDB.create({
          email: req.body.email,
          otp: otp,
          isValid: false,
        });

        await demoEmail(req.body.email, otp);

        res.send({ status: true, message: "OTP sent Successfully!" });
      } catch (error) {
        res.send({ status: false, message: error.message });
      }
    } else {
      try {
        const query = await otpDB.findOneAndUpdate(
          { email: req.body.email },
          { $set: { otp: otp, isValid: false } }
        );

        await demoEmail(req.body.email, otp);

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
    otp: Joi.number().min(1000).max(9999).required(),
  });

  const isValid = schema.validate(req.body);

  if (!isValid.error) {
    const email = req.body.email;
    const otp = req.body.otp;
    try {
      const query = await otpDB.findOne({ email: email });
      if (query.otp === parseInt(req.body.otp)) {
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
  } else {
    res.send({ status: false, message: isValid.error.details[0].message });
  }
};

module.exports = { sendOTP, verifyAdminOTP };
