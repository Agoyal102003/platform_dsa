import React, { useState, useEffect } from "react";
import './Leaderboard.css';
import Header from "../components/header";
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

function Leaderboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('/api/leaderboard');

                // Sort users by rank
                const sortedUsers = response.data.sort((a, b) => a.rank - b.rank);
                setUsers(sortedUsers);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="leaderbox">
            <Header />
            <div className="leader"><p>Leaderboard</p></div>
            <table>
                <thead>
                    <tr>
                        <th><PersonIcon className="icon" /> User Handle</th>
                        <th><EmojiEventsIcon className="icon" /> Rank</th>
                        <th><StarIcon className="icon" /> Solved Problems</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.rank}</td>
                            <td>{user.solvedProblemCount}</td> {/* Display solvedProblemCount */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
