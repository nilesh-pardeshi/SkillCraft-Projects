import React from 'react';

const LapList = ({ laps, formatTime }) => {
  if (laps.length === 0) return null;

  return (
    <div className="laps">
      <h3>Lap Times</h3>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            <span>Lap {index + 1}:</span> {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LapList;
