const Tutorial = require('../models/Tutorial');

exports.createTutorial = async (req, res) => {
    try {
        const newTutorial = new Tutorial(req.body);
        await newTutorial.save();
        res.status(201).json(newTutorial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTutorials = async (req, res) => {
    try {
        const tutorials = await Tutorial.find();
        res.status(200).json(tutorials);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTutorialById = async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (!tutorial) {
            return res.status(404).json({ message: "Tutorial not found" });
        }
        res.status(200).json(tutorial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
