//Figure1

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

//Figure2

// AKA Schema relative_dept_rating_figure:

{'result':{'course name':'The long name of the course',
           'course number': 'NAME',
           'course_ranking': 0, 
			'dept':{'dept_name': 'str', 'courses_in_dept': 0 , 'dept_mean': 0.0, 'dept_sd': 0.0}, 
			'current_course_mean': 0.0,
			'Instructors':[{'Instructor_Name': 'str', 'Instructor_mean_in_course': 0.0}, {'Instructor_Name': 'str', 'Instructor_mean_in_course': 0.0}, {...}]
			}
			}


Pandas(
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
	)
