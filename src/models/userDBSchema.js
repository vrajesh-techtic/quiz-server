const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: false,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quizzes: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { versionKey: false }
);

const users = mongoose.model("participants", userSchema);

module.exports = { users };
