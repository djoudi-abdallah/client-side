import React from 'react'
const Checkbox = ({ label }) => {
    return (
      <div className="checkbox-wrapper flex items-center font-[500]">
        <label>
          <input type="checkbox" />
          <span>{label}</span>
        </label>
      </div>
    );
  };
  export default Checkbox;