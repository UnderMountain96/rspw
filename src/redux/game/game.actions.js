import { SETUNITS } from "./game.types";

export function setUnits(units) {
  return {
    type: SETUNITS,
    payload: units,
  };
}
