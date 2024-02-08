import React from "react";
import { useController } from "react-hook-form";
import "./Input.css";

const Input = (props) => {
  const { field, fieldState } = useController(props);

  const { label } = props;

  return (
    <div className="input-container">
      <div className="field">
        <div className="input">
          <label>{label}</label>
          <input {...field} />
        </div>
        {fieldState.error && <p className="error">{fieldState.error.message}</p>}
      </div>
    </div>
  );
};

export default Input;
