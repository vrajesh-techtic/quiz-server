const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const result = new Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
    },
    email: {
      type: String,
      unique: false,
      required: true,
    },
    name: {
      type: String,
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

    totalScore: {
      type: Number,
      required: true,
    },

    totalAttempted: {
      type: Number,
      required: true,
    },
    totalQuizQuestions: {
      type: Number,
      required: true,
    },

    totalUnattempted: {
      type: Number,
      required: true,
    },

    accuracy: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const resultSchema = mongoose.model("result", result);

module.exports = { resultSchema };
