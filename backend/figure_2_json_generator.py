import numpy as np
import pandas as pd
from mongo import mongo_driver

valid_query = 'engr 1510 mep-orientation'

def relative_dept_rating_figure_json_generator(valid_uuid):
    '''
    This function will build the json for the response to build the relative department rating figure 
    (2nd from top on the left side). The json has structure given in schema.json, for this rating.

    Inputs: valid_uuid - a validated uuid from the 'uuid' field in the dataframe
    Returns: a valid json needed to generate the figure
    '''
    coll_name = 'aggregated_gcoe_sp18'
    # Make a connection to the db
    db = mongo_driver()
    coll = db.get_db_collection('reviews-db', coll_name)

    # search the collection of interest for the valid_uuid
    cursor = coll.find({'uuid':valid_uuid})

    # convert the query result to a df
    uuid_df =  pd.DataFrame(list(cursor))
    
    # Add an error catching if the len(df) !> 1
    if len(uuid_df)==0:
        print('The uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)
        raise Exception('The uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)

    # Get various parameters of the search
    subj = uuid_df['Subject Code'].unique()[0]
    cnum = uuid_df['Course Number'].unique()[0]
    cname = uuid_df['Course Title'].unique()[0]
    cmean = uuid_df['Avg Course Rating'].unique()[0]
    
    dept_mean = uuid_df['Avg Department Rating'].unique()[0]
    dept_sd = uuid_df['SD Department Rating'].unique()[0]
    
    ## Get the instructor details
    # Build a dictionary based on the instructors that have taught the course
    # Define an instructor function to return the instructor dict based on passed parameters
    def instructor(last_name, first_name, mean_in_course ):
        return {'Name':str(last_name)+str(first_name), 'Instructor_mean_in_course':mean_in_course}
    instructors = []
    
    # Fill out the instructors list with entries from the uuid_df
    for i in range(len(uuid_df)):
        # Add a new list entry to instructors for each instructor in the df
        instructors.append(instructor(uuid_df['Instructor First Name'][i], uuid_df['Instructor Last Name'][i], uuid_df['Avg Instructor Rating In Section'][i]))
        
    ## Get the course ranking for the department from the uuid
    
    # Find all courses with given subject in ag_df
    subj_search = coll.find({'Subject Code':subj})
    subj_df = pd.DataFrame(list(subj_search))

    # Sort out the repeat courses such that we only get a single entry for course rating
    # Get the number of unique courses in a given department
    num_courses = subj_df['Course Number'].nunique()

    # Drop all duplicates from subj_df
    subj_df.drop_duplicates(subset = ['Course Number'], inplace=True)

    # Sort the subj_df based on Avg Course Rating field
    subj_df.sort_values(by = 'Avg Course Rating', ascending=True,inplace=True)

    # Find placement within the sorted subj_df 
    subj_df.reset_index(inplace=True)
    crank = subj_df.index[subj_df['Course Number'] == cnum].tolist()[0] + 1
    total_dept = len(subj_df)
    
    # Build the json response
    response = {'result':{'course name':cname,
           'course number': cnum,
           'course_ranking': crank, 
                          'dept':{'dept_name': subj, 'courses_in_dept': total_dept , 'dept_mean': dept_mean, 'dept_sd':dept_sd}, 
                          'current_course_mean': cmean, 
                          'Instructors':instructors}}
    return cursor

