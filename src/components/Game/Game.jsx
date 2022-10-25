import React from "react";

export const Game = () => {
  return (
    <div class="game">
      <table class="score-table">
        <h1>Choose your unit</h1>
        <thead>
          <tr class="score-table--lable"></tr>
        </thead>
        <tbody>
          <tr class="score-table--value"></tr>
        </tbody>
      </table>
    </div>
  );
};
