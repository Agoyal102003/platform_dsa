const mongoose = require('mongoose');

const DataStructureSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    content: { type: String, required: true }
});

const DataStructure = mongoose.model('DataStructure', DataStructureSchema);

module.exports = DataStructure;
