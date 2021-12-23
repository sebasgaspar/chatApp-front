import { SET_LOADING } from "../actions/ActionTypes"

const loadingReducer = (state:any, action:any) => {
    if (!state ) state = {}
    if (action.type === SET_LOADING) {
        return {
            ...state,
            loadingSelected: action.payload.loadingSelected,
        };
    } else {
        return state;
    }
};

export default loadingReducer;
