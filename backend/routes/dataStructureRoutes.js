const express = require('express');
const router = express.Router();
const DataStructure = require('../models/DataStructure');

// Route to get data structure by name
router.get('/api/data-structure/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const dataStructure = await DataStructure.findOne({ name });
        if (dataStructure) {
            res.json({ content: dataStructure.content });
        } else {
            res.status(404).json({ error: 'Data structure not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
