let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const workoutDay1 = {
  day: new Date().setDate(new Date().getDate()-1)
};
const workoutDay2 = {
  day: new Date().setDate(new Date().getDate()-2)
};
const workoutDay3 = {
  day: new Date().setDate(new Date().getDate()-3)
};

const exercisesDay1 = [
  {
    type: "resistance",
    name: "Bicep Curl",
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Push Press",
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4
  },
  {
    type: "resistance",
    name: "Bench",
    duration: 30,
    distance: 2
  }
];

const exercisesDay2 = [
  {
    type: "resistance",
    name: "Bicep Curl",
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Push Press",
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4
  },
  {
    type: "resistance",
    name: "Bench",
    duration: 30,
    distance: 2
  }
];

const exercisesDay3 = [
  {
    type: "resistance",
    name: "Bicep Curl",
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4
  },
  {
    type: "resistance",
    name: "Push Press",
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4
  },
  {
    type: "resistance",
    name: "Bench",
    duration: 30,
    distance: 2
  }
];


async function queryDatabase(day, exercisesArray){
  await db.Workout.deleteMany({})
  .then(() => db.Workout.collection.insert(day))
  .then(() => db.Exercise.collection.insertMany(exercisesArray))
  .then(dbExercises => {
    return db.Workout.findOneAndUpdate({}, { $push: { exercises: dbExercises.ops.map((element, key) => element._id)}}, 
    { new: true })
  })
  // findOneAndUpdate the Workout document with the ObjectIds of the exercises we just created
  .then(data => {
    console.log('WORKOUT: ', data)
    // console.log(data.result.n + " records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

async function initSeeds(){
  await queryDatabase(workoutDay1, exercisesDay1)
  await queryDatabase(workoutDay2, exercisesDay2)
  await queryDatabase(workoutDay3, exercisesDay3)

  process.exit(0);
};

initSeeds();