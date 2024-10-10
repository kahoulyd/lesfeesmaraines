const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.post("/run-code-py", (req, res) => {
  const { code } = req.body;

  fs.writeFileSync("user_code.py", code);

  exec("py user_code.py", (err, stdout, stderr) => {
    if ((err || stderr) && !stdout) {
      return res.json({
        output: stderr,
        isCorrect: false,
      });
    } else {
      return res.json({
        output: stdout,
        isCorrect: true,
      });
    }
  });
});

app.post("/run-code-js", (req, res) => {
  const { code } = req.body;

  fs.writeFileSync("user_code.js", code);

  exec("node user_code.js", (err, stdout, stderr) => {
    if ((err || stderr) && !stdout) {
      return res.json({
        output: stderr,
        isCorrect: false,
      });
    } else {
      return res.json({
        output: stdout,
        isCorrect: true,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
