# Figure1


{
	"result": 
	{
		"instructors": 
		[
			{"name": "name1", "crs_rating": 1, "avg_rating": 1},
			{"name": "name2", "crs_rating": 2, "avg_rating": 2},
			{"name": "name3", "crs_rating": 3, "avg_rating": 3},
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

{'result':[{'object list':[{'object': 'str, e.g. department_name', 
'time_series_values':
[{'year': 2018, 'semester': 'str', 'value': 0.0},{'year': 2017, 'semester': 'str', 'value': 0.0}, {'year': 2016, 'semester': 'str', 'value': 0.0}]}, 
{'object': 'str, e.g. AME 5553 rating','time_series_values':[{'year': 2018, 'semester': 'str', 'value': 0.0},{'year': 2017, 'semester': 'str', 'value': 0.0}, {'year': 2016, 'semester': 'str', 'value': 0.0}]}]}]}

# Basically, the response is organized by object, then the semester, value, and year are included in lists for each object
#   This should leave us some extensibility for adding in other time series easily and parsing them in the same manner, even for
# 		objects that only have data over a limited period.

"""
Pandas = [
	1=Avg Course Rating, 
	2=Avg Department Rating
	3=Avg Inst Rating in Section
	4=College Code
	5=Course Num
	6=Course Title
	7=Inst First
	8=Inst ID
	9=Inst Last
	10=Num Responses
	11=Queryable Course String
	12=SD Course Rating
	13=SD Dept Rating
	14=SD instructor rating in Section
	15=Subject Code
	16=Term Code
	17=ObjectID
	18=uuid
	]
        """
