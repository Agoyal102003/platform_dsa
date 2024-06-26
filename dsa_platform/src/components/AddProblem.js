import React, { useState } from 'react';
import axios from 'axios';

const AddProblem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [testCases, setTestCases] = useState([{ input: '', output: '', explanation: '', predefinedInput: '', predefinedOutput: '' }]);

  const dataStructures = [
    "Arrays", "Matrix", "String", "Linked List", "Stack", "Queue", 
    "Tree", "Heap", "Hashing", "Set", "Map", "Graph"
  ];
  
  const algorithms = [
    "Analysis of Algorithms", "Searching Algorithms", "Sorting Algorithms", 
    "Greedy Algorithms", "Dynamic Programming", "Recursion", 
    "Backtracking", "Mathematical Algorithms", "Bitwise Algorithms", 
    "Pattern Searching", "Divide & Conquer", "Graph Algorithms"
  ];
  const topics = [...dataStructures, ...algorithms];

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '', explanation: '', predefinedInput: '', predefinedOutput: '' }]);
  };

  const handleTestCaseChange = (index, type, value) => {
    const newTestCases = testCases.map((testCase, i) => {
      if (i === index) {
        return { ...testCase, [type]: value };
      }
      return testCase;
    });
    setTestCases(newTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    // Construct the data object
    const data = {
      title,
      description,
      topic,
      difficulty,
      testCases,
    };

    try {
      const res = await axios.post('/api/problems', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Problem added successfully:', res.data);
    } catch (error) {
      console.error('Error adding problem:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Add New Problem</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label>Topic:</label>
          <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            required
          >
            {topics.map((topic, index) => (
              <option key={index} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
        <div>
          <h3>Test Cases:</h3>
          {testCases.map((testCase, index) => (
            <div key={index}>
              <div>
                <label>Input:</label>
                <textarea
                  value={testCase.input}
                  onChange={e => handleTestCaseChange(index, 'input', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Output:</label>
                <textarea
                  value={testCase.output}
                  onChange={e => handleTestCaseChange(index, 'output', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>predefinedInput:</label>
                <textarea
                  value={testCase.predefinedInput}
                  onChange={e => handleTestCaseChange(index, 'predefinedInput', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>predefinedOutput:</label>
                <textarea
                  value={testCase.predefinedOutput}
                  onChange={e => handleTestCaseChange(index, 'predefinedOutput', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Explanation:</label>
                <textarea
                  value={testCase.explanation}
                  onChange={e => handleTestCaseChange(index, 'explanation', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddTestCase}>Add Test Case</button>
        </div>
        <button type="submit">Add Problem</button>
      </form>
    </div>
  );
};

export default AddProblem;
