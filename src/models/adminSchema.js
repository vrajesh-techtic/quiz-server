const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    username: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

adminSchema.pre("save", async function (next) {
  console.log("Before saving to DB:", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.post("save", async function (doc, next) {
  console.log("After saving to DB: ", doc);
  next();
});

const admin = mongoose.model("admin", adminSchema);

module.exports = { admin };
