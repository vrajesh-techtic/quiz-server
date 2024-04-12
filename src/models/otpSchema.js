const mongoose = require("mongoose");

const { Schema } = mongoose;

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: Number,
      required: true,
    },

    isValid: {
      type: Boolean,
      required: false,
    },
  },
  { versionKey: false }
);

const otpDB = mongoose.model("otp", otpSchema);

module.exports = { otpDB };
