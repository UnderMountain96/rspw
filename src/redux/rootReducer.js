import { combineReducers } from "redux";

import { gameReducer } from "./game/game.reduser";


export const rootReducer = combineReducers({
    game: gameReducer,
});