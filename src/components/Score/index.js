import React from "react";
import "./style.css";

function Score(props) {
  return (
    <h2>
      Your score is: {props.score}, highScore: {props.highScore}
    </h2>
  );
}

export default Score;
