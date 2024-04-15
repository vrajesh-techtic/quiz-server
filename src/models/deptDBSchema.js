const mongoose = require("mongoose");

const { Schema } = mongoose;

const deptSchema = new Schema(
  {
    deptName: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const dept = mongoose.model("department", deptSchema);

module.exports = { dept };
