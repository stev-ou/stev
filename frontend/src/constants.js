//////////
const DEBUG = false;
//////////

// API mapping, based on search type selected from the Header menu
export const api_map = {
  course: 'courses/',
  department: 'department/',
  instructor: 'instructors/',
};

export const api_arg_map = {
  course: '?course=',
  department: '?department=',
  instructor: '?instructor=',
};

var api_endpoint;

if (!DEBUG) {
  api_endpoint = 'http://35.188.130.122/api/v0/';
} else {
  api_endpoint = 'http://127.0.0.1/api/v0/';
}

export { api_endpoint };

export var colors = [
  '#3f51b5',
  '#ff5722',
  '#e91e63',
  '#673ab7',
  '#ffc107',
  '#9c27b0',
  '#00bcd4',
  '#03a9b4',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#f44336',
  '#795548',
  '#607d8b',
  '#4caf50',
  '#2196f3',
  '#8bc34a',
  '#ff9800',
];
