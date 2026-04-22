import React from "react";

function Button({ label, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="custom-btn"
    >
      {label}
    </button>
  );
}

export default Button;
