const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// const db = require("./models");

const app = express();
// dev is for development environment in morgan
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// tells express if there are files that don't change, in public dir
app.use(express.static("public"));
// name of database goes after localhost
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.send("root route working");
});

app.get("/api/workouts", (req, res) => {
  res.send("workouts working");
});

app.get("/api/workouts/range", (req, res) => {
  res.send("workouts range working");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
