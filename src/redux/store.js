import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { saveLocalState, loadLocalState } from "../helpers/localStorage";
import { rootReducer } from "./rootReducer";
import { GAME_STATE } from "../helpers/constants";

const middlewares = applyMiddleware(thunk);

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const preloadedData = loadLocalState(GAME_STATE);

let store = createStore(
  rootReducer,
  preloadedData || {},
  composeEnhancers(middlewares)
);

store.subscribe(() => {
  const state = store.getState();
  saveLocalState(GAME_STATE, state);
});

export default store;
