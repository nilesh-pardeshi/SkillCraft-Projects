import React, { useState } from 'react';
import Board from './components/Board.jsx';

const App = () => {
  const [mode, setMode] = useState(null); // "pvp" or "pvc"
  const [gameKey, setGameKey] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
  };

  const updateScore = (winner) => {
    setScores(prev => ({
      ...prev,
      [winner]: (prev[winner] || 0) + 1
    }));
  };

  if (!mode) {
    return (
      <div className="app-container">
        <h1>Tic Tac Toe</h1>
        <h3>Select Game Mode</h3>
        <div className="mode-buttons">
          <button onClick={() => handleModeSelect('pvp')}>Player vs Player</button>
          <button onClick={() => handleModeSelect('pvc')}>Player vs Computer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Tic Tac Toe</h1>
      <Board key={gameKey} mode={mode} updateScore={updateScore} />
      <div className="scoreboard">
        <p>Score - X: {scores.X} | O: {scores.O} | Draws: {scores.Draw}</p>
      </div>
      <button className="restart" onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

export default App;
