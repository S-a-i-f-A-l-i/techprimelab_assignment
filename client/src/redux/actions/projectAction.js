import { GET_PROJECTS, GET_STATUS } from "./action";

export const getProjectAction = (data, dispatch) => {
  dispatch({
    type: GET_PROJECTS,
    payload: data,
  });
};
export const getStatusAction = (data, dispatch) => {
  dispatch({
    type: GET_STATUS,
    payload: data,
  });
};
