import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Config, Arena, Game } from "../../components";
import { getUnits } from "../../helpers/selectors";

export const GamePage = () => {
  const dispatch = useDispatch();
  const units = useSelector(getUnits);
  return (
    <>
      <Config />
      <Arena />
      <Game units={units} />
    </>
  );
};
