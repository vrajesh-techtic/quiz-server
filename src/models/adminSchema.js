const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    otp: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

const admin = mongoose.model("admin", adminSchema);

module.exports = { admin };
