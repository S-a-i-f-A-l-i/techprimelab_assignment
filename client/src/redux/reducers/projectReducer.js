import { GET_PROJECTS, GET_STATUS } from "../actions/action";
const initialState = {
  projects: [],
  numOfPages: 0,
  totalProjects: 0,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
        numOfPages: action.payload.numOfPages,
        totalProjects: action.payload.totalProjects,
      };
    case GET_STATUS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default projectReducer;
