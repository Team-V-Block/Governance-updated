import React from "react";
import "../../dist/index.css";

const Button = ({ description, handler, className }) => {
  return (
    <>
      <button onClick={handler} className={className}>
        {description}
      </button>
    </>
  );
};

export default Button;
