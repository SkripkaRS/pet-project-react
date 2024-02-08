import React from "react";
import { useController } from "react-hook-form";
import "./Checkbox.css";

const Checkbox = (props) => {
  const { field } = useController(props);

  const { label } = props;

  return (
    <div>
      <div className="checkbox-field">
        <input type="checkbox" {...field} />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
