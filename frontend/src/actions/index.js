// actions
export const setSearchStatus = content => ({
  type: 'SET_SEARCH_STATUS',
    status: content
});

export const SearchStatus = {
  VALID: 'VALID',
  INVALID: 'INVALID',
};
