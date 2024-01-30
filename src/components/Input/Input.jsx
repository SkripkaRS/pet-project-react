import React, { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(({ label, error, ...props }, ref) => (
  <div className="input-container">
    <div className="field">
      <div className="input">
        <label>{label}</label>
        <input ref={ref} {...props} />
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  </div>
));

export default Input;
