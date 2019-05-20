"""
This file will let you update the lists of instructors and courses that the autocomplete box uses in the frontend. 
It will save the return contents of <base_api_string>/courses/all and <base_api_string>/instructors/all into
course_instructor_lists.json. The format is 
{
	courses: <course_dict>,
	instructors: <instructor_dict>
}
Make sure to update the api string (below) if the api version or endpoint changes.
"""

import json
import requests

# Define the base api string
base_api_string = 'http://api.evals.info/api/v0/'

def get_lists():
	# Define the json object
	json_object = {}
	# Define and hit api urls
	all_courses = base_api_string+'courses/all'
	all_instructors = base_api_string+'instructors/all'

	# Index into the response
	courses = requests.get(all_courses)
	instructors = requests.get(all_instructors)
	json_object['courses']=courses.json()['result']
	json_object['instructors']=instructors.json()['result']

	# Write the api response to src/course_instructor_list.json
	with open('src/course_instructor_list.json', 'w') as f:
		json.dump(json_object, f)

	return

if __name__=='__main__':
	get_lists()
