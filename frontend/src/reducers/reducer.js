import {SearchStatus} from "../actions";

const initial_state = {valid_search: SearchStatus.INVALID,
                       search_type: "course", 
                       search_text: ""};

const valid_search = (state = initial_state, action) => {
  switch (action.type) {
  case 'SET_SEARCH_STATUS':
      return {...state,
              valid_search: action.status
             };
  case 'SET_SEARCH_TEXT':
      return {...state,
              search_text: action.text
             };
  case 'SET_SEARCH_TYPE':
      return {...state,
              search_type: action.type
             };
    default:
      return state;
  }
};

export default valid_search;
