const initialState = {
  projects: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return { some: "something" };
    case "DELETE":
      return { some: "something" };
    default:
      return state;
  }
};
export default projectReducer;
