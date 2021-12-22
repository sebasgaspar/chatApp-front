import { SET_SINGLE_CHAT } from "../actions/ActionTypes"

const chatReducer = (state:any, action:any) => {
    if (!state ) state = {}
    if (action.type === SET_SINGLE_CHAT) {
        return {
            ...state,
            chatSelected: action.payload.chatSelected,
        };
    } else {
        return state;
    }
};

export default chatReducer;
