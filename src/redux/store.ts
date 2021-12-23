import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const initialState = {
  chatState: {
    chatSelected: {}
  },
  loadingState: {
    loadingSelected: false
  }
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk.withExtraArgument({}))
);
