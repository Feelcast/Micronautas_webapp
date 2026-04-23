// install node: "winget install OpenJS.NodeJS"
// run in terminal "node server.js"
// enter the port specified on terminal with web browser

const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());



// enseñar sobre endpoints, req y res

app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  // enseñar sobre spawn y como llamar scripts de python
  // enseñar sobre escribir archivos
  fs.writeFileSync('input.json', JSON.stringify({ num1, num2, operation }));
  const pythonProcess = spawn('python', ['calculator.py']);

  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.send({ result });
    } else {
      res.status(500).send({ error: 'Calculation failed' });
    }
  });
});

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});