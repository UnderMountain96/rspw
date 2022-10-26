import React from "react";

export const Game = ({ units = [] }) => {
  return (
    <div className="game">
      <h1>Choose your unit</h1>
      <table className="score-table">
        <thead>
          <tr className="score-table--lable">
            {units.map((u) => (
              <th className="choose-unit">{u.icon}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="score-table--value"></tr>
        </tbody>
      </table>
    </div>
  );
};
