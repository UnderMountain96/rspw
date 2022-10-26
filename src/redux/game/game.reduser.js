import { SETUNITS } from "./game.types";

import units from "../../units";

const initialState = {
  units: units,
};

export const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SETUNITS:
      return {
        ...state,
        units: payload,
      };
    default:
      return state;
  }
};
