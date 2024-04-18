const { ObjectId } = require("mongodb");
const { dept } = require("../models/deptDBSchema");
const { decryptToken } = require("../middleware/authMiddleware");
const { admin } = require("../models/adminSchema");

/*

Required Parameters:

1. deptName

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
    try {
      const query = await dept.create({
        deptName: deptName,
        admin_id: id.token,
      });

      if (query !== null) {
        res.send({ status: true, message: "Department created successfully!" });
      } else {
        res.send({ status: false, message: "Department not created !" });
      }
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const getAllDept = async (req, res) => {
  try {
    const query = await dept.find({}, { _id: 0 });
    console.log(query);
    if (query !== null) {
      res.send({
        status: true,
        message: "Departments fetched successfully!",
        data: query.map((i) => i.deptName),
      });
    } else {
      res.send({ status: false, message: "No departments found !" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = { createDept, getAllDept };
