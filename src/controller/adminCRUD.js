const Joi = require("joi");
const { admin } = require("../models/adminSchema");

const addAdmin = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    name: Joi.string().required(),
    password: Joi.string()
      .regex( new 
        RegExp(
          "^(?-i)(?=^.{8,}$)((?!.*s)(?=.*[A-Z])(?=.*[a-z]))(?=(1)(?=.*d)|.*[^A-Za-z0-9])^.*$"
        )
      )
      .required()
      .messages({
        // "string.pattern.base":
        //   "Password must have atleast one digit, one lowercase,uppercase & special character and length must be 8 to 32 characters ",
        // "string.empty": "Password Can't be empty ",
        // "string.min": "Password must be of 8 to 32 characters.",
      }),

    confirmPassword: Joi.ref("password"),
  });

  const isValid = schema.validate(req.body);

  res.send(isValid);

  console.log("isValid", isValid);

  //   if (!isValid.error) {
  //     // const obj = {
  //     //   email: req.body.email,
  //     //   name: req.body.name,
  //     //   otp: otp,
  //     // };
  //     try {
  //       const query = await admin.create(req.body);

  //       res.send({ status: true, message: "User created successfully!" });
  //     } catch (error) {
  //       res.send({ status: false, message: "User already exists. Try Login!" });
  //     }
  //   } else {
  //     res.send({ status: false, message: isValid.error.details[0].message });
  //   }
};

const verifyAdminOTP = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().min(1000).max(9999).required(),
  });
  const isValid = schema.validate(req.body);

  if (!isValid.error) {
    try {
      const query = await admin.findOne({ email: req.body.email });
      if (query.otp[query.otp.length - 1] === req.body.otp) {
        const otpQuery = await admin.findOneAndUpdate(
          { email: req.body.email },
          { $set: { otp: [] } }
        );

        res.send({
          status: true,
          message: "OTP Verified Successfully!",
        });
      } else {
        res.send({ status: false, message: "Invalid OTP !" });
      }
    } catch (error) {
      res.send({ status: false, message: "User does not exists. Try Signup!" });
    }
  } else {
    res.send({ status: false, message: isValid.error.details[0].message });
  }
};

module.exports = { addAdmin };
