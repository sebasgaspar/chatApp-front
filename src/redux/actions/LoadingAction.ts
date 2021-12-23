import { SET_LOADING } from "./ActionTypes";

const setLoadingAction = (loadingSelected: any) => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      loadingSelected
    },
  });
};

export default setLoadingAction;
