import { combineReducers } from "redux";
import chatReducer from "./ChatReducer";
import loadingReducer from "./LoadingReducer";

export default combineReducers({
    chatState: chatReducer,
    loadingState: loadingReducer
});
