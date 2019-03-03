# Figure1


{
	"result": 
	{	"course name": ' Long name',
		"course number": 1441,
		"dept name": "ENGR",
		"instructors": 
		[
			{"name": "name1", "crs_rating": 1, "avg_rating": 1, "term": "Spring 2017"},
			{"name": "name2", "crs_rating": 2, "avg_rating": 2, "term": "Spring 2017"},
			{"name": "name3", "crs_rating": 3, "avg_rating": 3, "term": "Spring 2017"},
		]
	}
}

# Figure2

# AKA Schema relative_dept_rating_figure:

{'result':{'course name':'The long name of the course',
           'course number': 'NAME',
           'course_ranking': 0, 
			'dept':{'dept_name': 'str', 'courses_in_dept': 0 , 'dept_mean': 0.0, 'dept_sd': 0.0}, 
			'current_course_mean': 0.0,
			'Instructors':[{'Instructor_Name': 'str', 'Instructor_mean_in_course': 0.0}, {'Instructor_Name': 'str', 'Instructor_mean_in_course': 0.0}, {...}]
			}
			}

# Figure 3
# AKA Time series for Course rating, department rating, and others

{'result': {'course number': 1411,
			'course over time':{
				'name': 'Name of course',
				'semesters':['Fall 2015', 'Spring 2016', 'Summer 2017','Fall 2016', 'Spring 2017', 'Spring 2018'], # This determines number of data points
				'ratings':[4.212, 4.354, 3.898, 2.98, 3.45, 3.69]},
			'course over time':{
				'dept name': "AME",
				'semesters':['Fall 2015', 'Spring 2016', 'Summer 2017','Fall 2016', 'Spring 2017', 'Spring 2018'],
				'ratings':[4.6, 3.456732,4.168, 4.212, 4.354, 3.898]},
			'instructors':[
				{'name':'Instr1',
				'semesters':['Fall 2015','Fall 2016', 'Spring 2017', 'Spring 2018'],
				'ratings':[4.35, 4.2, 3.76, 2.6]},

				{'name':'Instr2',
				'semesters':['Fall 2015', 'Spring 2016', 'Summer 2017','Fall 2016'],
				'ratings':[4.1, 3.1, 3.2, 3.45]},

				{'name':'Instr3',
				'semesters':['Summer 2017','Fall 2016', 'Spring 2017', 'Spring 2018'],
				'ratings':[4.6, 4.7, 3.9, 4.4]}
				]
			}

	
}

# Basically, the response is organized by object, then the semester, value, and year are included in lists for each object
#   This should leave us some extensibility for adding in other time series easily and parsing them in the same manner, even for
# 		objects that only have data over a limited period.
