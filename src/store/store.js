import { createStore, applyMiddleware } from "redux";
import RootReducer from "./root-reducer.js";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

const middlewares = [logger];
export const Store = createStore(
  RootReducer,
  {},
  applyMiddleware(...middlewares)
);
export const persistor = persistStore(Store);

const exporter = { persistor, Store };

export default exporter;
