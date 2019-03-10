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
// export const api_endpoint = 'http://35.188.130.122/api/v0/';
export const api_endpoint = 'http://127.0.0.1/api/v0/'
