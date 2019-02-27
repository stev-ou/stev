import pprint
import json
from mongo import mongo_driver
import pandas as pd
from collections import Counter
import re
import yaml
from data_aggregation import combine_means

# Establish the DB Name 
DB_NAME = "reviews-db"

# This is the set of that will be queried by the API
COLLECTION_NAMES = ["aggregated_GCOE", "aggregated_JRCOE"]

# This is the period that will be considered "current" by the API. 
# These are term codes, where the first 4 digits corresponds to year, last 2 digits to semester (10:fall, 20:spring, 30:summer), 
# e.g. 201710 is Fall 2017
CURRENT_SEMESTERS = [201810, 201820, 201830, 201710, 201720, 201730]

# Import the mappings to find the semester for each course
# Read in the question mappings values from the mappings.yaml
file_path = __location__+"/mappings.yaml"

with open(file_path) as f:
    # use safe_load instead load
    mappings = yaml.safe_load(f)
    SEMESTER_MAPPINGS = mappings['Term_code_dict']

def course_instructor_ratings_api_generator(uuid):
    '''
    This function will take one validated course-based uuid in the aggregated database and will
    build a json response to present the values needed for figure 1. Briefly, this api response 
    will show all of the professors who have taught the course in the most recent semester, what
    rating each professor received, and what average rating each instructor received on average 
    in the most recent semester of data.
    api schema defined in api_schema.py
    Inputs: valid_uuid - a validated uuid from the 'uuid' field in the dataframe
    Returns: a valid json needed to generate the figure
    '''
    db = mongo_driver()

    # Construct the json containing necessary data for figure 1 on course page
    ret_json = {"result": {"instructors": []}}


    for coll_name in COLLECTION_NAMES:
        print("NEXT")
        coll = db.get_db_collection('reviews-db', coll_name)
        # Use the database query to pull needed data
        # cursor = coll.find({"course_uuid": uuid})
        cursor = coll.find({'$and':[
            {"course_uuid":uuid},
            {"Term Code": {'$in': CURRENT_SEMESTERS}}
            ]
        })
        
        # For whatever reason, generating a dataframe clears the cursor, so logic check here
        populated =  cursor.count() > 0

        print(cursor.count())
        df = pd.DataFrame(list(cursor))

        # This assumes that there will be no same uuid's across the different collections, e.g. the same uuid in GCOE and JRCOE
        if populated:
            # Add an error catching if the len(df) !> 1
            if len(df)==0:
                print('The course_uuid '+ uuid + ' was not found within the db collection ' + coll_name)
                raise Exception('The course_uuid '+ uuid + ' was not found within the db collection ' + coll_name)

            for row in df.itertuples():
                # need to average all ratings across all classes taught by each instructor
                df_inst = pd.DataFrame(list(coll.find({"Instructor ID": row[8]})))
                total = 0
                count = 0
                for inst_row in df_inst.itertuples():
                    total += inst_row[3]
                    count += 1
                avg = round(total/count, 7)

                inst = {"name": row[7] + ' ' + row[9], "crs rating": row[3], "avg rating": avg}
                ret_json["result"]["instructors"].append(inst)

    return ret_json

def relative_dept_rating_figure_json_generator(valid_uuid):
    '''
    This function will build the json for the response to build the relative department rating figure 
    (2nd from top on the left side). The json has structure given in schema.json, for this rating.

    Inputs: valid_uuid - a validated uuid from the 'uuid' field in the dataframe
    Returns: a valid json needed to generate the figure
    '''
    ##### Initial setup stuff
    

    # Define an instructor function to return the instructor dict based on passed parameters
    def instructor(last_name, first_name, mean_in_course, semester_taught):
        return {'name':str(last_name)+str(first_name), 'instructor mean in course':float(mean_in_course), 'semester':str(semester_taught)}
    instructors = []

    # Make a connection to the db
    db = mongo_driver()

    # Search through each of the collections 
    for coll_name in COLLECTION_NAMES:
        print("NEXT")
        coll = db.get_db_collection('reviews-db', coll_name)
        # Use the database query to pull needed data
        # cursor = coll.find({"course_uuid": uuid})
        cursor = coll.find({'$and':[
            {"course_uuid":valid_uuid},
            {"Term Code": {'$in': CURRENT_SEMESTERS}}
            ]
        })
        # print(cursor.count())
        uuid_df = pd.DataFrame(list(cursor))
        # pprint.pprint(uuid_df.head())
        # print(len(uuid_df))

        if len(uuid_df)!=0:
            # This means we found uuid results in this collection, so we can skip the rest of the collections
            break
    
    # Add an error catching if the len(df) !> 1
    if len(uuid_df)==0:
        print('The course_uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)
        raise Exception('The course_uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)

    # Get various parameters of the search
    subj = uuid_df['Subject Code'].unique()[0]
    cnum = uuid_df['Course Number'].unique()[0]
    cname = uuid_df['Course Title'].unique()[0]
    cmean = uuid_df['Avg Course Rating'].unique()[0]
    
    dept_mean = uuid_df['Avg Department Rating'].unique()[0]
    dept_sd = uuid_df['SD Department Rating'].unique()[0]
    
    ## Get the instructor details
    # Build a dictionary based on the instructors that have taught the course
    
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
    response = {'result':{'course name':str(cname),
           'course number': int(cnum),
           'course ranking': int(crank), 
                          'dept':{'dept name': str(subj), 'courses in dept': int(total_dept) , 'dept mean': float(dept_mean), 'dept sd':float(dept_sd)}, 
                          'current course mean': float(cmean), 
                          'instructors':instructors}}
    return response

def query_function(db, query, field_to_search):
    '''
    This function will perform substring querying on a given field in the db, to match an arbitrary user search to an 
    instance in the db. The function splits the input string 'query' by letter/number interface and whitespace delimiters, 
    and then searches for each of these in the DB field_to_search. Based on the frequency of appearance, the function then 
    returns a list of the most likely uuid's for the given search.

    inputs:
    db: a connection to the db
    query: a string query, unaltered
    collections_to_search: a list of distinct collections to look through to try to find the given uuid
    field_to_search: a single field to search in the db collection
        - If needed, create a new queryable search field in the data_aggregation.py for your desired search
            See Queryable Course String field for example of this.

    '''
    # Error check to make sure the query exists
    if query == '':
        print('Empty search string was passed to the query function')
        return []


    #Split the query by the assumed space delimiter
    query_list_initial = query.split(' ')

    # Split any unsplit entries at letter/number interface or symbol, e.g. :
    query_list = []
    for q in query_list_initial:
        split = re.split('(\d+)',q)
        for i in split:
            if i != '' and i not in query_list:
                query_list.append(i)

    # Search through the list of valid collections to find the proper college for the course search
    # Create an index to relate uuid query results to the query
    query_match_results = {}
    # print(query_list)

    for coll in COLLECTION_NAMES:
        for query in query_list:
            # Find the query in the collection
            collection = db.get_db_collection(DB_NAME, coll)
            collection.create_index([(field_to_search, 'text')])
            test_data = collection.find({"$text": {"$search": query}}, {'course_uuid':1, '_id':0})
            # print(list(set([item['course_uuid'] for item in list(test_data)])))

            # Add the query to the query_match_results if it isnt already in there, if it is leave it and delete duplicates
            if query not in query_match_results.keys():
                query_match_results[query] = list(set([item['course_uuid'] for item in list(test_data)]))
            else:
                new_set = set(query_match_results[query] + list(set([item['course_uuid'] for item in list(test_data)])))
                query_match_results[query] = list(new_set)

    # pprint.pprint(query_match_results)
    # Compare the query_match_results to one another to find the optimal response
    # Combine all of the lists
    full_q_list = []
    for q in query_list:
        for e in query_match_results[q][:]:
            full_q_list.append(e)

    # Get the max number of repeat list occurrences
    full_q_list = Counter(full_q_list).most_common(len(full_q_list))

    if len(full_q_list) == 0:
        print('Using the query function, the query ' + query + ' was not found in the field ' + field_to_search)
        return []

    # If there is equal number of occurences for the first and second uuid, return all of the most frequent occurences
    elif full_q_list[0][1]==full_q_list[1][1]:
        result_list = [full_q_list[0][0], full_q_list[1][0]]
        for i in range(2,len(full_q_list)):
            if full_q_list[i][1] == full_q_list[0][1]:
                result_list.append(full_q_list[i][0])

    # If the most frequent occurence is 1, just return the list with the lowest number of findings
    elif full_q_list[0][1] == 1:
        result_list = query_match_results[query_list[0]]
        for i in query_match_results.keys():
            if len(query_match_results[i])!=0 and len(query_match_results[i])<len(result_list):
                result_list = query_match_results[i]
    
    # Else there is a single max occurence in the list, and this is all we will return            
    else:
        result_list = [full_q_list[0][0]]

    return result_list

if __name__ == '__main__':
    # Test the db search
    db = mongo_driver()

    pprint.pprint(relative_dept_rating_figure_json_generator("engr2002"))
    #pprint.pprint(relative_dept_rating_figure_json_generator("engr2002"))
    #print(query_function(db,'thermodynamics','Queryable Course String'))



