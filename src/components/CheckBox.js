import React from 'react';

const Checkbox = ({ label, checked, onChange, error }) => (
  <div className="checkbox">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label && <label>{label}</label>}
    <br/>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default Checkbox;