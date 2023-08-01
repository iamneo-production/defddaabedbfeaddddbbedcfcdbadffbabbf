import React, { useState } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="stop-watch">
      <p> React Stopwatch</p>
      <Timer time={time} />
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}

function Timer(props) {
  return (
    <p data-testid="time">
      {/* <span className="digits"> */}
      {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:     
      {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:
      {("0" + ((props.time) % 100)).slice(-2)}
    </p>
  );
}

function ControlButtons(props) {
  const StartButton = (
    <div className="btn-grp">
      <input
        type="button"
        className="btn btn-one btn-start"
        onClick={props.handleStart}
        data-testid="start"
        value="Start"
      />

      <input
        type="button"
        className="btn btn-two"
        disabled="true"
        data-testid="reset"
        value="Reset"
      />
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      {props.isPaused ? (
        <input
          type="button"
          className="btn btn-one"
          onClick={props.handlePauseResume}
          data-testid="resume"
          value="Resume"
        />
      ) : (
        <input
          type="button"
          className="btn btn-one"
          onClick={props.handlePauseResume}
          data-testid="pause"
          value="Pause"
        />
      )}
      <input
        type="button"
        className="btn btn-two"
        onClick={props.handleReset}
        data-testid="reset"
        value="Reset"
      />
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}

export default Stopwatch;