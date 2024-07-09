import React from 'react';
import './Choise.css';

const Choices = ({ onPlayerChoice }) => {
  const handleChoice = (choice) => {
    onPlayerChoice(choice);
  };

  return (
    <div className="choices">
      <button className="choice-button" onClick={() => handleChoice('rock')}>✊🏽</button>
      <button className="choice-button" onClick={() => handleChoice('paper')}>🤚🏽</button>
      <button className="choice-button" onClick={() => handleChoice('scissors')}>✌🏽</button>
    </div>
  );
};

export default Choices;
