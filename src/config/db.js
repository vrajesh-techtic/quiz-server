const { default: mongoose } = require("mongoose");
const env = require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

function connectDB() {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("database connected!");
    })
    .catch((error) => { 
      console.error(error.message);
    });
}

module.exports = { connectDB };
 