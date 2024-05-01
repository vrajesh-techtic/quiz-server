const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const attempt_log = new Schema(
  {
    quesId: {
      type: ObjectId,
      required: true,
    },

    user_id: {
      type: ObjectId,
      required: true,
    },

    quizCode: {
      type: String,
      validate: {
        validator: function (v) {
          if (v.length === 6) return true;
          else return false;
        },
        message: "Quiz Code length must be 6.",
      },
      required: true,
    },

    userAns: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const attemptSchema = mongoose.model("attempt_log", attempt_log);

module.exports = { attemptSchema };
