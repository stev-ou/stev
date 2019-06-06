import { SearchStatus, SearchType } from '../actions';

const initial_state = {
  valid_search: SearchStatus.INVALID,
  search_type: SearchType.COURSE,
  search_text: '',
  user_alerted: false,
  course_list: [],
  instructor_list: []
};

const valid_search = (state = initial_state, action) => {
  switch (action.type) {
    case 'RESET_TO_DEFAULTS':
      return { initial_state, user_alerted: state['user_alerted'] };
    case 'SET_COURSE_LIST':
      return {...state, course_list: action.list}
    case 'SET_INSTRUCTOR_LIST':
      return {...state, instructor_list: action.list}
    case 'SET_SEARCH_STATUS':
      return { ...state, valid_search: action.status };
    case 'SET_SEARCH_TEXT':
      return { ...state, search_text: action.text };
    case 'SET_SEARCH_TYPE':
      return { ...state, search_type: action.search_type };
    case 'SET_STATE_TO_URL':
      return {
        ...state,
        search_type: action.search_type,
        search_text: action.search_text,
        valid_search: action.search_status,
        user_alerted: action.user_alerted,
      };
    case 'ALERT_USER':
      return { ...state, user_alerted: true };
    default:
      return state;
  }
};

export default valid_search;
