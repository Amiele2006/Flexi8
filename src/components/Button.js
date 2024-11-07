import React from 'react';

const Button = ({ label, onClick, type = "button", disabled = false, children, className = "" }) => 
    (
  <button className={`${className}`} onClick={onClick} type={type} disabled={disabled}>
    {children}
    {label}
  </button>
);

export default Button;