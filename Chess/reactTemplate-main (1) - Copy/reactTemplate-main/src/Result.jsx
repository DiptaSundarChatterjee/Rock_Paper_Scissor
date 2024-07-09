import React from 'react';
import './Result.css';

const Result = ({ result, attempts, choices }) => (
  <div className="result">
    {result === 'win' && <p className="final-result win">You win the game!</p>}
    {result === 'lose' && <p className="final-result lose">You lose the game!</p>}
    {result === 'draw' && <p className="final-result draw">The game is a draw!</p>}
    {result === null && attempts < 3 && <p>Make your choice...</p>}
    {result === null && attempts === 3 && <p>Calculating final result...</p>}
    <div>
      {choices.map((choice, index) => (
        <p key={index}>
          Round {index + 1}: You chose <span className="player-choice">{choice.playerChoice}</span>, Computer chose <span className="computer-choice">{choice.computerChoice}</span>
        </p>
      ))}
    </div>
  </div>
);

export default Result;
