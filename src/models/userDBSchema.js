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
    isAuth: {
      type: Boolean,
      required: true,
    },
    otp: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

const users = mongoose.model("participants", userSchema);

module.exports = { users };
