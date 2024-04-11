const mongoose = require("mongoose");

const { Schema } = mongoose;

const deptSchema = new Schema(
  {
    deptName: {
      type: String,
      required: true,
    },

    // quizCode: {
    //   type: String,
    //   unique: true,
    //   validate: {
    //     validator: function (v) {
    //       if (v.length === 6) return true;
    //       else return false;
    //     },
    //     message: "Quiz Code length must be 6.",
    //   },
    //   required: true,
    // },

    // questionList: {
    //   type: Array,
    //   default: [],
    // },
  },
  { versionKey: false }
);

const dept = mongoose.model("department", deptSchema);

module.exports = { dept };
