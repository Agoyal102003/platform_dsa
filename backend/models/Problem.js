// models/Problem.js
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  topic: { type: String, required: true },
  testCases: [{
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String, required: true },
    predefinedInput: { type: String, required: true },
    predefinedOutput: { type: String, required: true }
  }],
  solved: { type: Boolean, default: false } // Added solved field
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
