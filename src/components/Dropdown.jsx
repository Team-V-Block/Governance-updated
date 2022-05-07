import React from "react";
import "../../dist/index.css";
const Dropdown = ({ onChangeHandler, roles }) => {
  return (
    <>
      <label htmlFor="roles" className="role-dropdown-label">
        Assign address a role from the dropdown
      </label>
      <select
        name="roles"
        form="role-form"
        onChange={onChangeHandler}
        defaultValue={""}
        className="role-dropdown"
      >
        <option value=""></option>
        <option value={roles.chairman}>Chairman</option>
        <option value={roles.teacher}>Teacher</option>
        <option value={roles.student}>Student</option>
      </select>
    </>
  );
};

export default Dropdown;
