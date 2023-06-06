const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes");
const { ProjectRouter } = require("./routes/project.routes");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

require("dotenv").config();

const app = express();

const PORT = 8000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.use("/user", UserRouter);

app.use("/project", ProjectRouter);

// app.use(notFound);

// app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected Successfully to the Database");
  } catch (err) {
    console.log("Failed to connect Database");
    console.log(err);
  }
  console.log(` The port is running in ${PORT}`);
});
