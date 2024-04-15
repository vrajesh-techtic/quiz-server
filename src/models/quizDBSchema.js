const mongoose = require("mongoose");

const { Schema } = mongoose;

const quizSchema = new Schema(
  {
    quizName: {
      type: String,
      required: true,
    },

    quizCode: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          if (v.length === 6) return true;
          else return false;
        },
        message: "Quiz Code length must be 6.",
      },
      required: true,
    },

    deptName: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const quizzes = mongoose.model("quiz", quizSchema);

module.exports = { quizzes };
