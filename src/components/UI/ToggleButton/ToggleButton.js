import React from "react";

const toggleButton = props => {
  return (
    <div onClick={props.clicked}>
      menu
      <div />
      <div />
      <div />
    </div>
  );
};

export default toggleButton;
