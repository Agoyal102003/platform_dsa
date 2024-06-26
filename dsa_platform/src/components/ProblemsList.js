import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Problem from './Problem';
import './Problems.css';

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [error, setError] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User not authenticated. No token found.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/problems', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProblems(res.data);

        const userRes = await axios.get(`http://localhost:3000/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const user = userRes.data;
        // Filter out null or invalid problem IDs
        const validSolvedProblems = user.solvedProblems.filter(problemId => problemId);
        setSolvedProblems(validSolvedProblems);
        setFilteredProblems(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching problems.');
        console.error(err);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const filterProblems = () => {
      let updatedProblems = problems;

      if (selectedTopic !== 'All') {
        updatedProblems = updatedProblems.filter(problem => problem.topic === selectedTopic);
      }

      if (selectedDifficulty !== 'All') {
        updatedProblems = updatedProblems.filter(problem => problem.difficulty === selectedDifficulty);
      }

      setFilteredProblems(updatedProblems);
    };

    filterProblems();
  }, [problems, selectedTopic, selectedDifficulty]);

  const totalProblems = problems.length;
  const solvedCount = solvedProblems.length;
  const solvedPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  return (
    <div className="problist">
      <div style={{display: "flex"}}>
        <div style={{marginLeft: "30px", paddingTop: "30px"}}>
          <h1 style={{color: 'silver'}}>Problems</h1>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="filter-container" style={{ marginLeft: "760px",marginTop: "40px", marginBottom: "20px", display: 'flex', gap: '10px' }}>
          <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
            <option value="All">All Topics</option>
            {/* Add your topic options here */}
            <option value="Arrays">Arrays</option>
            <option value="Matrix">Matrix</option>
            <option value="String">String</option>
            <option value="Linked List">Linked List</option>
            <option value="Stack">Stack</option>
            <option value="Queue">Queue</option>
            <option value="Tree">Tree</option>
            <option value="Heap">Heap</option>
            <option value="Hashing">Hashing</option>
            <option value="Set">Set</option>
            <option value="Map">Map</option>
            <option value="Graph">Graph</option>
            <option value="Analysis of Algorithms">Analysis of Algorithms</option>
            <option value="Searching Algorithms">Searching Algorithms</option>
            <option value="Sorting Algorithms">Sorting Algorithms</option>
            <option value="Greedy Algorithms">Greedy Algorithms</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Recursion">Recursion</option>
            <option value="Backtracking">Backtracking</option>
            <option value="Mathematical Algorithms">Mathematical Algorithms</option>
            <option value="Bitwise Algorithms">Bitwise Algorithms</option>
            <option value="Pattern Searching">Pattern Searching</option>
            <option value="Divide & Conquer">Divide & Conquer</option>
            <option value="Graph Algorithms">Graph Algorithms</option>
          </select>

          <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)}>
            <option value="All">All Difficulty Levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="explore_practiceProgressBarSection__uzYl5">
        <div className='probsolvedheadng'>
          <strong>{solvedCount}</strong> of {totalProblems} Problems Solved ({solvedPercentage} %)
        </div>
        <div className="explore_practiceProgressBarContainer__3uyVa">
          <div className="ui tiny progress" data-percent={solvedPercentage}>
            <div className="bar" style={{ width: `${solvedPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="problems-list">
        {filteredProblems.map((problem) => (
          <Problem key={problem._id} problem={problem} isSolved={solvedProblems.includes(problem._id)} />
        ))}
      </div>
    </div>
  );
};

export default ProblemsList;
