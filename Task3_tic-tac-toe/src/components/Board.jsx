import React, { useState, useEffect } from 'react';
import Cell from './Cell.jsx';
import Confetti from './Confetti.jsx';

const Board = ({ mode, updateScore }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });

  const winningLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const checkWinner = (board) => {
    for (let line of winningLines) {
      const [a,b,c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }
    return board.includes(null) ? { winner: null, line: [] } : { winner: 'Draw', line: [] };
  };

  const handleClick = (index) => {
    if (board[index] || winnerInfo.winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const smartAI = (board) => {
    // Try winning first
    for (let line of winningLines) {
      const [a,b,c] = line;
      const values = [board[a], board[b], board[c]];
      if (values.filter(v => v==='O').length===2 && values.includes(null)) {
        return line[values.indexOf(null)];
      }
    }
    // Block player
    for (let line of winningLines) {
      const [a,b,c] = line;
      const values = [board[a], board[b], board[c]];
      if (values.filter(v => v==='X').length===2 && values.includes(null)) {
        return line[values.indexOf(null)];
      }
    }
    // Else pick random
    const empty = board.map((v,i)=>v===null?i:null).filter(i=>i!==null);
    return empty[Math.floor(Math.random()*empty.length)];
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result.winner) {
      setWinnerInfo(result);
      updateScore(result.winner);
    }

    if (!winnerInfo.winner && mode==='pvc' && !xIsNext) {
      const timer = setTimeout(() => {
        const aiMove = smartAI(board);
        const newBoard = [...board];
        newBoard[aiMove] = 'O';
        setBoard(newBoard);
        setXIsNext(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, xIsNext, mode]);

  const renderCell = (i) => (
    <Cell value={board[i]} onClick={() => handleClick(i)} highlight={winnerInfo.line.includes(i)} />
  );

  return (
    <div>
      {winnerInfo.winner && winnerInfo.winner !== 'Draw' && <Confetti />}
      <div className="status">
        {winnerInfo.winner ? 
          (winnerInfo.winner==='Draw' ? "It's a Draw!" : `Winner: ${winnerInfo.winner}`) 
          : `Next: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {board.map((_,i) => renderCell(i))}
      </div>
    </div>
  );
};

export default Board;
