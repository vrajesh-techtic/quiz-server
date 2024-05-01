const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const deptSchema = new Schema(
  {
    deptName: {
      type: String,
      required: true,
    },
    admin_id: {
      type: ObjectId,
      required: true,
    },
  },
  { versionKey: false }
);

const dept = mongoose.model("department", deptSchema);

module.exports = { dept };
