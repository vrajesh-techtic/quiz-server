const Joi = require("joi");
const { admin } = require("../models/adminSchema");
const { handleErrors } = require("../middleware/authMiddleware");
const {
  createAdminValidation,
  updateAdminValidation,
} = require("../middleware/validators");
const { otpDB } = require("../models/otpSchema");
const { ObjectId } = require("mongodb");
const { isUserExist } = require("./otpCRUD");

/*

Required Parameters:

1. email (unique)
2. name
3. username (unique)
4. password
*/

// For creating new admin
const addAdmin = async (req, res) => {
  const isValid = createAdminValidation(req.body);

  if (!isValid.error) {
    const resp = await isUserExist(req.body.email);

    if (resp.status) {
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
        const errors = handleErrors(error);
        res.send({ status: false, message: errors });
      }
    } else {
      res.send(resp);
    }
  } else {
    console.log("called");

    const errors = handleErrors(isValid.error);
    res.send({ status: false, message: errors });
  }
};

const updateAdmin = async (req, res) => {
  const isValid = updateAdminValidation(req.body);

  if (!isValid.error) {
    const admin_id = new ObjectId(req.headers.admin_id);

    const newAdminData = {
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
    };

    const query = await admin.findByIdAndUpdate(
      { _id: admin_id },
      newAdminData
    );

    res.send({ status: true, message: "Profile updated Successfully!" });
  } else {
    const errors = handleErrors(isValid.error);
    res.send({ status: false, message: errors });
  }
};

module.exports = { addAdmin, updateAdmin };
