import React from 'react';

const InputField = ({ label, type = "text", value, onChange, placeholder = "", error }) => (
  <div className="input-field">
    {label && <label>{label}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} /> 
    <br/>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default InputField;