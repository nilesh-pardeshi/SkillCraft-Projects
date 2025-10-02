import React, { useState, useRef } from 'react';
import LapList from './LapList';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}:${milliseconds.toString().padStart(2,'0')}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStart} className="start">Start</button>
        <button onClick={handlePause} className="pause">Pause</button>
        <button onClick={handleReset} className="reset">Reset</button>
        <button onClick={handleLap} className="lap">Lap</button>
      </div>
      <LapList laps={laps} formatTime={formatTime} />
    </div>
  );
};
//dkd
export default Stopwatch;
