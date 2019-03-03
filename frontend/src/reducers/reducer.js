import {SearchStatus} from "../actions";

const initial_state = {valid_search: SearchStatus.INVALID};

const valid_search = (state = initial_state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_STATUS':
      return {valid_search: action.status};
    //  return [
    //    ...state,
    //    {
    //      valid_search: action.status,
    //    },
    //  ];
    default:
      return state;
  }
};

export default valid_search;
