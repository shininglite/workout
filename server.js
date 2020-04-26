const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
var path = require("path");
const app = express();
// dev is for development environment in morgan
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// tells express if there are files that don't change, in public dir
app.use(express.static("public"));
// name of database goes after localhost
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// get route to find all workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    console.log(dbWorkout);
    res.json(dbWorkout);
    
    // res.send("api workouts working");// this works in postman with 3000/api/workouts
  })
  .catch(err => {
    res.status(404).send('Sorry, cant find that');
    res.json(err);
  });
});

//create new exercise
app.post("/api/workouts", ({body}, res) => {
  db.Workout.create(body)
  // id of the new exercise we just created, gets pushed in to the workout field into the inside the workout it is associated with 
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// post route to update an existing exercise
app.post("/exercise/:id", ({body}, res) => {
  db.Workout.create(body)
  // id of the new exercise we just created, gets pushed in to the workout field into the inside the workout it is associated with 
    .then(({_id}) => db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { workout: _id } }, { type: "Benchpress" }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  res.send("workouts range working"); // this works in postman with 3000/api/workouts/range
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// post route to add a new exercise
app.post("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/exercise.html"));
  //res.send("exercise route working");
});

//app.get("/tables", function(req, res) {
//  res.sendFile(path.join(__dirname, "../public/tables.html"));
//});

app.get("/stats", (req, res) => {
  
  // res.send("stats route working");
});

// catch all route
app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname + "./public/index.html"));
  res.send("root route working");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// post to previous workout plan
// post to new workout plan
// get combined weight of multiple exercises on stats page