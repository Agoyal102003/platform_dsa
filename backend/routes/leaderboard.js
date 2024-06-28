const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary

router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find({})
            .select('fullName username solvedProblems'); // Select relevant fields

        // Calculate the count of solved problems
        const usersWithCounts = users.map(user => {
            const solvedProblemCount = user.solvedProblems.filter(problem => problem !== null).length;

            return {
                _id: user._id,
                username: user.username || user.fullName,
                solvedProblemCount: solvedProblemCount,
            };
        });

        // Sort users by solved problems descending
        const sortedUsers = usersWithCounts.sort((a, b) => b.solvedProblemCount - a.solvedProblemCount);

        // Assign rank based on sorted order
        const rankedUsers = sortedUsers.map((user, index) => {
            return {
                ...user,
                rank: index + 1,
            };
        });

        res.status(200).json(rankedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
});

module.exports = router;
