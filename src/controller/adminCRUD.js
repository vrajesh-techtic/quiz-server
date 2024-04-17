const Joi = require("joi");
const { admin } = require("../models/adminSchema");
const {
  handleErrors,
  generateToken,
  decryptToken,
} = require("../middleware/authMiddleware");
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

const isAdmin = async (id) => {
  try {
    const adminId = new ObjectId(id);
    const query = await admin.findById(adminId, { _id: 0, password: 0 });

    if (await query) {
      return query;
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

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

        const token = generateToken(query._id.valueOf());

        res.cookie("JWT", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        console.log("token", token);
        res.send({
          status: true,
          message: "User created Successfully!",
          token: token,
        });
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

const getAdmin = async (req, res) => {
  const token = req.body.token;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }

  const checkAdmin = await isAdmin(id.token);
  console.log("checkAdmin", checkAdmin);
  if (checkAdmin) {
    const profileData = await admin.aggregate([
      {
        $match: {
          _id: new ObjectId(id.token),
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "admin_id",
          as: "departments",
        },
      },
      {
        $unwind: "$departments", // Unwind the departments array to denormalize
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "departments._id",
          // Use department _id
          foreignField: "dept_id",
          as: "quizzes",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name",
          },
          email: {
            $first: "$email",
          },
          username: {
            $first: "$username",
          },
          totalDepartments: {
            $sum: 1,
          },
          // Count total departments
          totalQuizzes: {
            $sum: {
              $size: "$quizzes",
            },
          }, // Count total quizzes
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    res.send({ status: true, data: profileData[0] });
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const getDeptList = async (req, res) => {
  const token = req.body.token;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }

  const checkAdmin = await isAdmin(id.token);
  console.log("checkAdmin", checkAdmin);
  if (checkAdmin) {
    const deptList = await admin.aggregate([
      {
        $match: {
          _id: new ObjectId(id.token),
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "admin_id",
          as: "depts",
        },
      },
      {
        $unwind: "$depts",
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "depts._id",
          foreignField: "dept_id",
          as: "quizzes",
        },
      },
      {
        $group: {
          // _id: "$id",
          _id: "$depts.deptName",
          quizzes: { $push: "$quizzes.quizName" },
        },
      },
      {
        $project: {
          "dept-name": "$_id",
          quizzes: 1,
          _id: 0,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $arrayToObject: [
              [{ k: "$dept-name", v: "$quizzes" }],
            ],
          },
        },
      },
    ]);

    res.send({ status: true, data: deptList });
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

module.exports = { addAdmin, updateAdmin, getAdmin, getDeptList };
