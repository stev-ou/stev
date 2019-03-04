// actions
export const setSearchStatus = content => ({
  type: 'SET_SEARCH_STATUS',
    status: content
});

export const setSearchType = content => ({
  type: 'SET_SEARCH_TYPE',
    type: content
});

export const setSearchText = content => ({
  type: 'SET_SEARCH_TEXT',
    text: content
});

export const SearchStatus = {
  VALID: 'VALID',
  INVALID: 'INVALID',
};

export const SearchType = {
  COURSE: 'COURSE',
  INSTRUCTOR: 'INSTRUCTOR',
};

