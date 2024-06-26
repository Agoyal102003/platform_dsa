// Problem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Problems.css';

const Problem = ({ problem, isSolved }) => {
  return (
    <div className="problem">
      <h2 className="text" style={{color: "#a5a5a5"}}>{problem.title}</h2>
      <Link to={`/problems/${problem._id}`}>
        <button className='bttttn'>{isSolved ? 'Solved' : 'Solve Problem'}</button>
      </Link>
    </div>
  );
};

export default Problem;
