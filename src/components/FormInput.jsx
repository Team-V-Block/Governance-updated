import React from "react";
import "../../dist/index.css";
const FormInput = ({
  type,
  value,
  onChangeHandler,
  placeholder,
  className,
}) => {
  return (
    <>
      <form action="" id="role-form" className="form">
        <input
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={className}
          placeholder={placeholder}
          required
        />
      </form>
    </>
  );
};

export default FormInput;
