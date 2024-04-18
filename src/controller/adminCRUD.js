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
  console.log("req.body.data", req.body.data);
  const isValid = updateAdminValidation(req.body.data);

  if (!isValid.error) {
    const token = req.body.token;
    const id = decryptToken(token);
    if (!id.status) {
      res.send({ status: false, message: id.message });
    }

    const checkAdmin = await isAdmin(id.token);

    if (checkAdmin) {
      const admin_id = new ObjectId(id.token);

      const newAdminData = {
        email: req.body.data.email,
        name: req.body.data.name,
        username: req.body.data.username,
      };

      const query = await admin.findByIdAndUpdate(
        { _id: admin_id },
        newAdminData
      );

      console.log("query", query);

      res.send({ status: true, message: "Profile updated Successfully!" });
    } else {
      res.send({ status: false, message: "User does not exists!" });
    }
  } else {
    const errors = handleErrors(isValid.error);
    res.send({ status: false, message: errors });
  }
};


// To fetch Profile Data 
const getAdmin = async (req, res) => {
  const token = req.body.token;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }

  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    const profileData = await admin.aggregate([
      {
        $match: {
          _id: new ObjectId(id.token)
        }
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "admin_id",
          as: "departments"
        }
      },
      {
        $addFields: {
          totalDepartments: {
            $cond: {
              if: { $isArray: "$departments" },
              then: { $size: "$departments" },
              else: 0
            }
          }
        }
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "departments._id",
          foreignField: "deptId",
          as: "quizzes"
        }
      },
      {
        $addFields: {
          totalQuizzes: {
            $cond: {
              if: { $isArray: "$quizzes" },
              then: { $size: "$quizzes" },
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          username: { $first: "$username" },
          totalDepartments: { $max: "$totalDepartments" },
          totalQuizzes: { $max: "$totalQuizzes" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          email: 1,
          username: 1,
          totalDepartments: 1,
          totalQuizzes: 1
        }
      }
    ]
    );

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
            $arrayToObject: [[{ k: "$dept-name", v: "$quizzes" }]],
          },
        },
      },
    ]);

    res.send({ status: true, data: deptList });
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const deleteAdmin = async (req, res) => {
  const token = req.body.token;
  const id = decryptToken(token);

  if (!id.status) {
    res.send({ status: false, message: id.message });
  }

  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    const query = await admin.findByIdAndDelete(id.token);

    res.send({ status: true, message: "Account deleted Successfully!" });
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

module.exports = { addAdmin, updateAdmin, getAdmin, getDeptList, deleteAdmin };
