import "./style.css";

import React from "react";

const ElementCard = props => {
  return (
    <div className="card">
      <div
        className="img-container"
        onClick={() => {
          props.handleClick(props.id);
        }}
      >
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
};

export default ElementCard;
