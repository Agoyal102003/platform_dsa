const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new problem
router.post('/', async (req, res) => {
  try {
    const problem = new Problem(req.body);
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update problem solved status
router.patch('/:id/solved', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    problem.solved = req.body.solved;
    await problem.save();
    res.json({ message: 'Problem status updated', problem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
