import { CREATE_GRAPH } from "./graph-action";

const InitialState = {
  adjacentList: {},
};
const GraphReducer = (state = InitialState, action) => {
  switch (action.type) {
    case CREATE_GRAPH:
      return {
        ...state,
        adjacentList: action.payload,
      };
    default:
      return state;
  }
};

export default GraphReducer;
