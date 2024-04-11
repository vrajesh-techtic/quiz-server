const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
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

    ques: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      default: [],
      required: true,
    },
    correctAns: {
      type: String,
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false }
);

const questions = mongoose.model("question", questionSchema);

module.exports = { questions };
