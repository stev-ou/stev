// actions
export const setSearchStatus = content => ({
  type: 'SET_SEARCH_STATUS',
  status: content,
});

export const setSearchType = content => ({
  type: 'SET_SEARCH_TYPE',
  search_type: content,
});

export const setSearchText = content => ({
  type: 'SET_SEARCH_TEXT',
  text: content,
});

export const resetToDefaults = content => ({
  type: 'RESET_TO_DEFAULTS',
});

export const setStatetoURL = content => ({
  type: 'SET_STATE_TO_URL',
  search_type: content.search_type,
  search_text: content.search_text,
  user_alerted: content.user_alerted,
  search_status: content.search_status,
});

export const alertUser = content => ({
  type: 'ALERT_USER',
});

export const SearchStatus = {
  VALID: 'VALID',
  INVALID: 'INVALID',
};

export const SearchType = {
  COURSE: 'course',
  INSTRUCTOR: 'instructor',
};
