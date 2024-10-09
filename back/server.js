const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors()); 

// Route to execute Python code
app.post('/run-code', (req, res) => {
  const { code } = req.body;

  // Save code to a temporary Python file
  fs.writeFileSync('user_code.py', code);

  // Execute the Python file
  exec('py user_code.py', (err, stdout, stderr) => {
    if ((err || stderr) && !stdout) {
      return res.json({
        output: stderr,
        isCorrect: false,
      });
    }else {
      return res.json({
        output: stdout,
        isCorrect: true,
      });
    }

    // Define the expected output
    const expectedOutput = 'Hello, World!\n';
    const isCorrect = stdout === expectedOutput;

    res.json({
      output: stdout,
      isCorrect: isCorrect,
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
