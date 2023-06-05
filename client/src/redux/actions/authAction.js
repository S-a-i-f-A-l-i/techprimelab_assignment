import { LOGIN, LOGOUT } from "./action";
export const loginAction = (data, dispatch) => {
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", JSON.stringify(data.token));
  dispatch({
    type: LOGIN,
    payload: data,
  });
};
export const logoutAction = (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
