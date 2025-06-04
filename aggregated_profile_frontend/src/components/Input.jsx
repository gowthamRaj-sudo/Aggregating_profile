import React from "react";

const Input = ({ label, value, onChange, placeholder, type }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
