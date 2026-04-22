// src/components/ui/Loader.jsx
import React from "react";

const Loader = ({ size = 40, color = "#9a0606" }) => {
  return (
    <div
      style={{
        border: "4px solid #f3f3f3",
        borderTop: `4px solid ${color}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        animation: "spin 1s linear infinite",
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
