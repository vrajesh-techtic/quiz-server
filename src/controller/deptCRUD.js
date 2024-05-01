const { ObjectId } = require("mongodb");
const { dept } = require("../models/deptDBSchema");
const { decryptToken } = require("../middleware/authMiddleware");
const { admin } = require("../models/adminSchema");

/*

Required Parameters:

1. deptName

*/

const deptExist = async (deptName, admin_id) => {
  try {
    const query = await dept.findOne({ deptName, admin_id });

    if (query) {
      return { status: false, message: "Department already exists!" };
    } else {
      return { status: true };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

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

const createDept = async (req, res) => {
  const deptName = req.body.deptName;
  const token = req.body.token;
  const id = decryptToken(token);

  if (!id.status) {
    res.send({ status: false, message: id.message });
  }

  const checkAdmin = await isAdmin(id.token);
  console.log("checkAdmin", checkAdmin);
  if (checkAdmin) {
    const isDeptExist = await deptExist(req.body.deptName, id.token);
    if (isDeptExist.status) {
      try {
        const query = await dept.create({
          deptName: deptName,
          admin_id: id.token,
        });

        if (query !== null) {
          res.send({
            status: true,
            message: "Department created successfully!",
          });
        } else {
          res.send({ status: false, message: "Department not created !" });
        }
      } catch (error) {
        res.send({ status: false, message: error.message });
      }
    } else {
      res.send(isDeptExist);
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const deptList = async (req, res) => {
  const token = req.body.token;
  const id = decryptToken(token);

  if (!id.status) {
    res.send({ status: false, message: id.message });
  }

  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await dept.find({ admin_id: id.token });

      if (query !== null) {
        res.send({
          status: true,
          message: "Departments fetched successfully!",
          data: query.map((i) => i),
        });
      } else {
        res.send({ status: false, message: "No departments found !" });
      }
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const getQuizList = async (req, res) => {
  const token = req.body.token;
  const id = decryptToken(token);
  const dept_id = new ObjectId(req.body.dept_id);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await dept.aggregate([
        {
          $match: {
            admin_id: new ObjectId(id.token),
            _id: dept_id,
          },
        },
        {
          $lookup: {
            from: "quizzes",
            localField: "_id",
            foreignField: "deptId",
            as: "quizzes",
          },
        },
        {
          $unwind: "$quizzes",
        },
        {
          $group: {
            _id: "$_id",
            deptName: { $first: "$quizzes.deptName" },
            quizzes: {
              $push: {
                quizName: "$quizzes.quizName",
                quizCode: "$quizzes.quizCode",
              },
            },
          },
        },
        {
          $project: {
            quizzes: 1,
            _id: 0,
          },
        },
      ]);

      if (query.length === 0) {
        res.send({ status: true, data: [], message: "No Quiz exists" });
      } else {
        res.send({ status: true, data: query[0] });
      }
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const deleteDept = async (req, res) => {
  const token = req.body.token;
  const id = decryptToken(token);
  const dept_id = new ObjectId(req.body.dept_id);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    const query = await dept.findByIdAndDelete(dept_id);

    if (query) {
      res.send({ status: true, message: "Department Removed!" });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

module.exports = { createDept, deptList, getQuizList, deleteDept };
