const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/mainAPI");
const { connectDB } = require("./config/db");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(morgan("dev"));
app.use("", routes);

app.listen(port, () => {
  console.log("Mailer Server is running on port: " + port);
  connectDB();
});
