import {combineReducers} from "redux";
import chatReducer from "./ChatReducer";

export default combineReducers({
    chatState: chatReducer
});
