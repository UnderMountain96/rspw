import React from "react";

export const Config = () => {
  return (
    <div className="config">
      <label>
        <input type="checkbox" className="audio" />
        audio
      </label>
      <label>
        <input type="checkbox" className="extended" />
        extended
      </label>
    </div>
  );
};
