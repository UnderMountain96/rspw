import React from "react";

export const Config = () => {
  return (
    <div class="config">
      <div class="audio">
        <i class="bi bi-volume-up-fill audio-on"></i>
        <i class="bi bi-volume-mute-fill audio-off visually-hidden"></i>
      </div>
      <label>
        <input type="checkbox" class="audio" />
        audio
      </label>
      <label>
        <input type="checkbox" class="extended" />
        extended
      </label>
    </div>
  );
};
