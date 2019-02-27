const valid_search = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_STATUS':
      return action.status;
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
