import { LOGIN, LOGOUT } from "../actions/action";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: JSON.parse(localStorage.getItem("token")) || "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: "",
      };
    default:
      return state;
  }
};
export default authReducer;
