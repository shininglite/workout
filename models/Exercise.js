const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  duration: Number,
  distance: Number,
});
  
const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;