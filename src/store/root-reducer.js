import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import GraphReducer from "./graph-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["graph"],
};

const RootReducer = combineReducers({
  graph: GraphReducer,
});

export default persistReducer(persistConfig, RootReducer);
