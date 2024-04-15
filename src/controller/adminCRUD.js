const Joi = require("joi");
const { admin } = require("../models/adminSchema");

/*

Required Parameters:

1. email (unique)
2. name
3. username (unique)
4. password
*/

const addAdmin = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string()
      .alphanum()
      .regex(new RegExp("^[A-Za-z]w{3,14}$"))
      .required(),
    name: Joi.string().alphanum().required(),
    password: Joi.string()
      .regex(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must have atleast one digit, one lowercase,one uppercase & one special character and length must be 8 to 32 characters ",
        // "string.empty": "Password Can't be empty ",
        // "string.min": "Password must be of 8 to 32 characters.",
      }),

    confirmPassword: Joi.ref("password"),
  });

  const isValid = schema.validate(req.body);

  if (!isValid.error) {
    const adminData = {
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };

    try {
      const query = await admin.create(adminData);

      res.send({ status: true, message: query });
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: isValid.error.details[0].message });
  }

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
