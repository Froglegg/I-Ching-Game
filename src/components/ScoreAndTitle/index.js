import React from "react";
import "./style.css";

function ScoreAndTitle(props) {
  return (
    <div>
      <h1 className="title">I CHING MEMORY GAME</h1>
      <h2 className="title">
        Your score is: {props.score} <br></br>High score: {props.highScore}
      </h2>
    </div>
  );
}

export default ScoreAndTitle;
