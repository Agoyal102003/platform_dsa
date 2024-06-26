// components/CodeEditor.js

import React, { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import './CodeEditorOutput.css';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('cpp'); // Default language
  const [selectedTheme, setSelectedTheme] = useState('vs-dark'); // Default theme
  const [showOutput, setShowOutput] = useState(false); // State to control showing output

  const languages = ['cpp', 'python', 'javascript', 'java']; // Add more languages as needed
  const themes = ['vs-light', 'vs-dark', 'hc-black']; // Built-in themes

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/code-editor/runcode', { code, language: selectedLanguage, input });
      setOutput(response.data.output || response.data); // Assuming response.data.output contains the output
      setShowOutput(true); // Show output on successful compilation
    } catch (error) {
      setOutput(error.response?.data || error.message);
      setShowOutput(true); // Show output on error
    }
  };

  const toggleOutput = () => {
    setShowOutput(!showOutput); // Toggle output display
  };

  return (
    <div className="App">
      <div style={{ marginTop: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", background: "#252525" }}>
          <div>
            <select style={{ background: "#252525", color: "#a5a5a5", border: "1px solid silver", marginBottom: "5px", borderRadius: "4px" }} value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <select style={{ background: "#252525", color: "#a5a5a5", border: "1px solid silver", marginLeft: "5px", marginBottom: "5px", borderRadius: "4px" }} id="theme" value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
              {themes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </div>
        <Editor
          height="460px"
          defaultLanguage="cpp"
          defaultValue="// Write your code here..."
          language={selectedLanguage}
          theme={selectedTheme}
          onChange={(value) => setCode(value)}
        />

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <textarea
            placeholder="Input for your program (if required)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ minHeight: '100px', padding: '5px', fontSize: '16px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button style={{ background: "#455b65", padding: "5px 10px", color: "#fff", borderRadius: "10px" }} onClick={handleRunCode}>Compile & Run</button>
            <button style={{ background: "#455b65", padding: "5px 10px", color: "#fff", borderRadius: "10px" }} onClick={toggleOutput}>{showOutput ? 'Hide Output' : 'Show Output'}</button>
          </div>
        </div>
      </div>

      <div className={`output-container ${showOutput ? 'open' : ''}`}>
        <button className="toggle-output-button" onClick={toggleOutput}>
          {showOutput ? 'Hide Output' : 'Show Output'}
        </button>
        <div className="output-content">
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
