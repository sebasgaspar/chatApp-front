import { SET_SINGLE_CHAT } from "./ActionTypes";

const setChatAction = (chatSelected: any) => async (dispatch: any) => {
  dispatch({
    type: SET_SINGLE_CHAT,
    payload: {
      chatSelected
    },
  });
};

export default setChatAction;
