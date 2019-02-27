const valid_search = (state = [], action) => {
  switch (action.type) {
    case 'VALID':
      return [
        ...state,
        {
          valid_search: true
        }
      ];
    case 'INVALID':
      return [
          ...state,
          {
              valid_search: false
          }
      ];
    default:
      return state;
  }
};

export default valid_search;
