const express = require('express');
const router = express.Router();
const Algorithm = require('../models/Algorithm');

// Route to get algorithm by name
router.get('/api/algorithm/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const algorithm = await Algorithm.findOne({ name });
        if (algorithm) {
            res.json({ content: algorithm.content });
        } else {
            res.status(404).json({ error: 'Algorithm not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
