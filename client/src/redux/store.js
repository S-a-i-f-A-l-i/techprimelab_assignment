import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";

import authReducer from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";

const combinedReducer = combineReducers({
  authReducer,
  projectReducer,
});

const store = legacy_createStore(combinedReducer, applyMiddleware(logger));

export default store;
