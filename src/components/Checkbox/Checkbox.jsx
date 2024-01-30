import React, { forwardRef } from "react";
import "./Checkbox.css";

const Checkbox = forwardRef(({ label, error, ...props }, ref) => (
  <div>
    <div className="checkbox-field">
      <input type="checkbox" ref={ref} {...props} />
      <label>{label}</label>
    </div>
  </div>
));

export default Checkbox;
