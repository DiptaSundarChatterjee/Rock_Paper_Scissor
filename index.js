
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/play', (req, res) => {
  const { playerChoice } = req.body;
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  let result;
  if (playerChoice === computerChoice) {
    result = 'draw';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'win';
  } else {
    result = 'lose';
  }

  res.json({ playerChoice, computerChoice, result });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
