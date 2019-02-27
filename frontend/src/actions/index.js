// actions
export const SetSearchStatus = status => ({
  type: 'SET_SEARCH_STATUS',
  status,
});

export const SearchStatus = {
  VALID: 'VALID',
  INVALID: 'INVALID',
};
