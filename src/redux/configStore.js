import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducers/reducer";

const rootReducer = combineReducers({
  reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
