const { ObjectId } = require("mongodb");
const { dept } = require("../models/deptDBSchema");

/*

Required Parameters:

1. deptName

*/

const createDept = async (req, res) => {
  const deptName = req.body.deptName;

  try {
    const query = await dept.create({ deptName: deptName });

    if (query !== null) {
      res.send({ status: true, message: "Department created successfully!" });
    } else {
      res.send({ status: false, message: "Department not created !" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
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
