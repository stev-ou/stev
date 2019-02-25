import pprint
import json
from mongo import mongo_driver
import pandas as pd
from collections import Counter
import re

# Establish a database connection
DB_NAME = "reviews-db"
COLLECTION_NAME = "reviews-collection"


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

    coll_name = 'aggregated_gcoe_sp18'
    db = mongo_driver()
    coll = db.get_db_collection('reviews-db', coll_name)
    cursor = coll.find({"course_uuid": uuid})
    df = pd.DataFrame(list(cursor))

    # Add an error catching if the len(df) !> 1
    if len(df)==0:
        print('The course_uuid '+ uuid + ' was not found within the db collection ' + coll_name)
        raise Exception('The course_uuid '+ uuid + ' was not found within the db collection ' + coll_name)

    # Construct the json containing necessary data for figure 1 on course page
    ret_json = {"result": {"instructors": []}}
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
    coll_name = 'aggregated_gcoe_sp18'
    # Make a connection to the db
    db = mongo_driver()
    coll = db.get_db_collection('reviews-db', coll_name)

    # search the collection of interest for the valid_uuid
    cursor = coll.find({'course_uuid':valid_uuid})

    # convert the query result to a df
    uuid_df =  pd.DataFrame(list(cursor))
    
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
    # Define an instructor function to return the instructor dict based on passed parameters
    def instructor(last_name, first_name, mean_in_course ):
        return {'name':str(last_name)+str(first_name), 'instructor mean in course':float(mean_in_course)}
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
    response = {'result':{'course name':str(cname),
           'course number': int(cnum),
           'course ranking': int(crank), 
                          'dept':{'dept name': str(subj), 'courses in dept': int(total_dept) , 'dept mean': float(dept_mean), 'dept sd':float(dept_sd)}, 
                          'current course mean': float(cmean), 
                          'instructors':instructors}}
    return response

def query_function(db, query, collections_to_search, field_to_search):
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

    # Split any unsplit entries at letter/number interface
    query_list = []
    for q in query_list_initial:
        split = re.split('(\d+)',q)
        for i in split:
            if i != '' and i not in query_list:
                query_list.append(i)

    # Search through the list of valid collections to find the proper college for the course search
    collections_to_search = ['aggregated_gcoe_sp18']

    # Create an index to relate uuid query results to the query
    query_match_results = {}

    for query in query_list:
        for coll in collections_to_search:
            # Find the query in the collection
            collection = db.get_db_collection(DB_NAME, coll)
            collection.create_index([(field_to_search, 'text')])
            test_data = collection.find({"$text": {"$search": query}}, {'uuid':1, '_id':0})
            query_match_results[query] = list(set([item['uuid'] for item in list(test_data)]))
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

    # pprint.pprint(course_instructor_ratings_api_generator("engr2002"))
    # pprint.pprint(relative_dept_rating_figure_json_generator("engr2002"))

    # Test the db search
    db = mongo_driver()
    print(query_function(db,'dsa 4413 algorithm analysis', 'aggregated_gcoe_sp18', 'Queryable Course String'))



