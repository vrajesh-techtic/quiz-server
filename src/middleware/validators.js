const Joi = require("joi");

// Validations for Create Admin
const createAdminValidation = (obj) => {
  console.log(obj);
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter valid email!",
    }),
    username: Joi.string()
      .regex(new RegExp(/^[A-Za-z]\w{3,14}$/))
      .required()
      .messages({
        "string.pattern.base": "Username must be alphanumeric only! ",
      }),
    name: Joi.string().regex(new RegExp("^[a-zA-Z]+$")).required().messages({
      "string.pattern.base": "Name must be alphabets only! ",
    }),
    password: Joi.string()
      .required("Enter your password")
      .min(8)
      .custom((value, helpers) => {
        if (!/[a-z]/.test(value)) {
          return helpers.error("lowercase");
        }
        if (!/[A-Z]/.test(value)) {
          return helpers.error("uppercase");
        }
        if (!/[0-9]/.test(value)) {
          return helpers.error("number");
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
          return helpers.error("special");
        }
        return value;
      }, "password validation")
      .messages({
        lowercase: "Password must have atleast one lowercase character",
        uppercase: "Password must have atleast one uppercase character",
        number: "Password must have atleast one digit",
        special: "Password must have atleast one special character",
      }),

    confirmPassword: Joi.ref("password"),
  });

  const isValid = schema.validate(obj);
  console.log(isValid.error);

  return isValid;
};

const updateAdminValidation = (obj) => {
  console.log(obj);
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter valid email!",
    }),
    username: Joi.string()
      .regex(new RegExp(/^[A-Za-z]\w{3,14}$/))
      .required()
      .messages({
        "string.pattern.base": "Username must be alphanumeric only! ",
      }),
    name: Joi.string().regex(new RegExp("^[a-zA-Z]+$")).required().messages({
      "string.pattern.base": "Name must be alphabets only! ",
    }),
  });

  const isValid = schema.validate(obj);

  return isValid;
};

const addUserValidation = (obj) => {
//   console.log(obj);
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter valid email!",
    }),

    name: Joi.string().regex(new RegExp("^[a-zA-Z]+$")).required().messages({
      "string.pattern.base": "Name must be alphabets only! ",
    }),

    quizCode: Joi.string()
      .min(6)
      .max(6)
      .regex(new RegExp("^[A-Z]+$"))
      .required()
      .messages({
        "string.pattern.base": "Quiz Code must be Uppercase only! ",
        "string.min": "Quiz Code should be minimum 6 characters.",
        "string.max": "Quiz Code should be maximum 6 characters.",
      }),
  });

  const isValid = schema.validate(obj);

  return isValid;
};

module.exports = {
  createAdminValidation,
  updateAdminValidation,
  addUserValidation,
};
