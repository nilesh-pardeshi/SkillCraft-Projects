import React, { useEffect, useState } from 'react';
import './Confetti.css';

const Confetti = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const confettiCount = 100;
    const newPieces = [];
    for (let i = 0; i < confettiCount; i++) {
      newPieces.push({
        id: i,
        left: Math.random()*100,
        delay: Math.random()*5
      });
    }
    setPieces(newPieces);
  }, []);

  return (
    <div className="confetti-wrapper">
      {pieces.map(p => (
        <div key={p.id} className="confetti" style={{ left: `${p.left}%`, animationDelay: `${p.delay}s` }}></div>
      ))}
    </div>
  );
};

export default Confetti;
