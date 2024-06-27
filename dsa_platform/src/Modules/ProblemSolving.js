// ProblemDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import '../components/Problems.css';
import Landing from '../components/Landing';

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('');
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User not authenticated. No token found.');
        return;
      }

      try {
        const res = await axios.get(`https://platform-dsa-1.onrender.com/api/problems/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProblem(res.data);

        const userRes = await axios.get(`https://platform-dsa-1.onrender.com/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const user = userRes.data;
        setSolved(user.solvedProblems.includes(id));
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching problem details.');
        console.error(err);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSolutionAccepted = async () => {
    if (!id) {
      console.error('Invalid problem ID');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://platform-dsa-1.onrender.com/api/users/updateSolvedProblems`, {
        problemId: id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSolved(true);
    } catch (err) {
      console.error('Error updating problem status', err);
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!problem) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className='prblslvng'>
        <div className='problm' style={{color: 'whitesmoke'}}>
          <div className='prbtitle'>
            <h4>{problem.title}</h4>
          </div>
          <div className='prbdes'>
            <p>{problem.description}</p>
          </div>
          <div className='prbcases'>
            <div>
              <p>Test Cases:</p>
            </div>
            <div>
              <ul>
                {problem.testCases.map((testCase, index) => (
                  <li className='casesbox' key={index}>
                    <strong>Input:</strong> {testCase.input}<br />
                    <strong>Output:</strong> {testCase.output}<br />
                    <strong>Explanation:</strong> {testCase.explanation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='codeEditor'>
          <Landing testCases={problem.testCases} onSolutionAccepted={handleSolutionAccepted} />
          {solved ? <p>y</p> : <p>n</p>}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
