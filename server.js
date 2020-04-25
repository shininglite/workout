const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

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
  
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
    res.send("workouts working");
  })
  .catch(err => {
    res.json(err);
  });

});

app.post("/exercise/:id", ({body}, res) => {
  db.Workout.create(body)
  // id of the new exercise we just created, gets pushed in to the workout field into the inside the ________ it is associated with 
    .then(({_id}) => db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { workout: _id } }, { type: "Benchpress" }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  res.send("workouts range working");
});

// app.get("/exercise", (req, res) => {
//   res.send("exercise route working");
// });

app.get("/stats", (req, res) => {
  res.send("stats route working");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// post to previous workout plan
// post to new workout plan
// get combined weight of multiple exercises on stats page