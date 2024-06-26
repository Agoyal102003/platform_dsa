const mongoose = require('mongoose');

const AlgorithmSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    content: { type: String, required: true }
});

const Algorithm = mongoose.model('Algorithm', AlgorithmSchema);

module.exports = Algorithm;
