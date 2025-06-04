import React from "react";

const Button = ({ onClick, disabled, text, style }) => {
  return (
    <div>
      <button onClick={onClick} disabled={disabled} style={style}>
        {text}
      </button>
    </div>
  );
};

export default Button;
