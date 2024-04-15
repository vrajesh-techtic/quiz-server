const Joi = require("joi");
const { admin } = require("../models/adminSchema");

/*

Required Parameters:

1. email (unique)
2. name
3. username (unique)
4. password
*/

// For creating new admin 
const addAdmin = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string()
      .regex(new RegExp(/^[A-Za-z]\w{3,14}$/))
      .required(),
    name: Joi.string().regex(new RegExp("^[a-zA-Z]+$")).required(),
    password: Joi.string()
      .regex(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must have atleast one digit, one lowercase,one uppercase & one special character and length must be 8 to 32 characters ",
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

      res.send({ status: true, message: "User created Successfully!" });
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: isValid.error.details[0].message });
  }
};



module.exports = { addAdmin };
