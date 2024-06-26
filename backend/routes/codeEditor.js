// routers/codeEditor.js

const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '..', 'temp'); // Define a temporary directory

// Ensure the temporary directory exists
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

// Route to execute code
router.post('/runcode', (req, res) => {
    const { code, language, input } = req.body;

    let filename;
    let command;
    const filepath = path.join(TEMP_DIR, `temp.${language === 'javascript' ? 'js' : language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : 'java'}`); // Dynamic path

    // Determine filename and command based on language
    switch (language) {
        case 'cpp':
            filename = 'temp.cpp';
            fs.writeFileSync(filepath, code);
            command = `echo "${input}" | g++ ${filepath} -o ${TEMP_DIR}/temp.exe && ${TEMP_DIR}/temp.exe`;
            break;
        case 'python':
            filename = 'temp.py';
            fs.writeFileSync(filepath, code);
            command = `echo "${input}" | python ${filepath}`;
            break;
        case 'javascript':
            filename = 'temp.js';
            fs.writeFileSync(filepath, code);
            command = `echo "${input}" | node ${filepath}`;
            break;
        case 'java':
            filename = 'Main.java';
            fs.writeFileSync(filepath, code);
            command = `echo "${input}" | javac ${filepath} && java -cp ${TEMP_DIR} Main`;
            break;
        default:
            res.status(400).send('Unsupported language');
            return;
    }

    // Execute the code
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Execution error:', error);
            res.status(500).send(error.message);
            return;
        }
        if (stderr) {
            console.error('Runtime error:', stderr);
            res.status(500).send(stderr);
            return;
        }
        console.log('Output:', stdout);
        res.send(stdout);
    });
});

module.exports = router;
