import React, { useState } from 'react';
import Choices from './Choise';
import Result from './Result';
import './App.css';

const App = () => {
  const [attempts, setAttempts] = useState(0);
  const [results, setResults] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState([]); // Track choices

  const handlePlayerChoice = (choice) => {
    if (attempts >= 3) return; // Prevent more than 3 attempts

    setLoading(true);
    fetch('http://localhost:5000/api/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerChoice: choice }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setResults([...results, data.result]);
        setChoices([...choices, { playerChoice: choice, computerChoice: data.computerChoice }]);
        setAttempts(attempts + 1);
        setLoading(false);

        if (attempts + 1 === 3) {
          const winCount = results.filter(result => result === 'win').length;
          const loseCount = results.filter(result => result === 'lose').length;

          if (winCount > loseCount) {
            setFinalResult('win');
          } else if (loseCount > winCount) {
            setFinalResult('lose');
          } else {
            setFinalResult('draw');
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleReset = () => {
    setAttempts(0);
    setResults([]);
    setFinalResult(null);
    setChoices([]);
  };

  return (
    <div className="app">
      <Result result={finalResult} attempts={attempts} choices={choices} />
      <h1>Rock, Paper, Scissors</h1>
      <Choices onPlayerChoice={handlePlayerChoice} />
      {loading && <p>Loading...</p>}
      {finalResult && <button className="reset-button" onClick={handleReset}>Reset Game</button>}
    </div>
  );
};

export default App;
