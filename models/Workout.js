const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
  exercise: 
  [{
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  }]
});
  
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;