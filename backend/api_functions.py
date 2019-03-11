import pprint
import json
from mongo import mongo_driver
import pandas as pd
from collections import Counter
import re
import os
import yaml
from data_aggregation import combine_means
import pymongo
import numpy as np

# Establish the DB Name 
DB_NAME = "reviews-db"

# This is the set of that will be queried by the API
COLLECTION_NAMES = ["aggregated_GCOE", "aggregated_JRCOE"]

# This is the period that will be considered "current" by the API. 
# These are term codes, where the first 4 digits corresponds to year, last 2 digits to semester (10:fall, 20:spring, 30:summer), 
# e.g. 201710 is Fall 2017
CURRENT_SEMESTERS = [201810, 201820, 201830, 201710, 201720, 201730, 201610, 201620, 201630]

# Import the mappings to find the semester for each course
# Read in the question mappings values from the mappings.yaml
# Get file location for mappings.yaml and reading data
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
file_path = __location__+"/mappings.yaml"

with open(file_path) as f:
    # use safe_load instead load
    mappings = yaml.safe_load(f)
    SEMESTER_MAPPINGS = mappings['Term_code_dict']

# Might be useful for multiple apis
def most_recent_semester_ind(semester_int_list):
    """
    Input a list of term codes, it will return the most recent term code
    """
    year_list = [int(str(i)[0:4]) for i in semester_int_list]
    # find the most recent year positions
    max_year = max(year_list)
    # Find the semesters of the most recent year
    max_sems = [semester_int_list[i] for i, j in enumerate(year_list) if j == max_year]

    # Find the max semester in this index
    semesters = [str(i)[-2:] for i in max_sems]

    if '10' in semesters:
        ind = '10'
    elif '30' in semesters:
        ind = '30'
    elif '20' in semesters:
        ind = '20'
    else:
        raise Exception('Unable to find most recent semester in api for figure 2')

    # Translate the ind to a semester
    most_recent_sem = int(str(max_year)+ ind)
    most_recent_ind = semester_int_list.index(most_recent_sem)
    return most_recent_sem # return the most recent sem as a term code

# Python program for implementation of MergeSort 
def mergeSort(arr): 
    if len(arr) >1: 
        mid = len(arr)//2 #Finding the mid of the array 
        L = arr[:mid] # Dividing the array elements  
        R = arr[mid:] # into 2 halves 
  
        mergeSort(L) # Sorting the first half 
        mergeSort(R) # Sorting the second half 
  
        i = j = k = 0
          
        # Copy data to temp arrays L[] and R[] 
        while i < len(L) and j < len(R): 
            if most_recent_semester_ind([L[i],R[j]]) == L[i]: 
                arr[k] = L[i] 
                i+=1
            else: 
                arr[k] = R[j] 
                j+=1
            k+=1
          
        # Checking if any element was left 
        while i < len(L): 
            arr[k] = L[i] 
            i+=1
            k+=1
          
        while j < len(R): 
            arr[k] = R[j] 
            j+=1
            k+=1
    return


def course_instructor_ratings_api_generator(db, uuid):
    '''
    This function will take one validated course-based uuid in the aggregated database and will
    build a json response to present the values needed for figure 1. Briefly, this api response 
    will show all of the professors who have taught the course in the most recent semester, what
    rating each professor received, and what average rating each instructor received on average 
    in the most recent semester of data.
    api schema defined in api_schema.py
    Inputs: db - a connection to the mongodb, i.e. db = mongo_driver()
            valid_uuid - a validated uuid from the 'uuid' field in the dataframe
    Returns: a valid json needed to generate the figure
    '''

    # Construct the json containing necessary data for figure 1 on course page
    ret_json = {"result": {"instructors": []}}

    # filter that we use on the collection
    coll_filter = {'$and':[
            {"course_uuid":uuid},
            {"Term Code": {'$in': CURRENT_SEMESTERS}}]}

    for coll_name in COLLECTION_NAMES:
        coll = db.get_db_collection('reviews-db', coll_name)
        # Use the database query to pull needed data
        cursor = coll.find(coll_filter)
        
        # For whatever reason, generating a dataframe clears the cursor, so get population here
        population = coll.count_documents(coll_filter)

        # This assumes that there will be no same uuid's across the different collections, e.g. the same uuid in GCOE and JRCOE
        if population > 0:
            df = pd.DataFrame(list(cursor))
            break


    # Add an error catching if the len(df) == 0
    if population==0:
        print('The course_uuid '+ uuid + ' was not found within the db collection ' + coll_name)
        raise Exception('The course_uuid '+ uuid + ' was not found within the db collection ' + coll_name)

    # Get the list of the most popular Course Titles of this course, and trim any entries that arent the most popular course name
    most_frequent_course = df['Course Title'].value_counts().idxmax()
    df = df[(df['Course Title']==most_frequent_course)]


    # The following is a very crappy way to get a list of unique indices that are in the order of the semesters
    #######
    # Define the instructor list
    instructor_list = list(reversed(list(df.drop_duplicates('Instructor ID', inplace=False)['Instructor ID'])))
    term_code_list = list(df.drop_duplicates(['Instructor ID','Term Code'], inplace=False)['Term Code'])

    # Sort the term code list - mergeSort is modified to use the most_recent_term_code function to compare term codes
    mergeSort(term_code_list)

    # Create the dict for this sorted term code list
    dict_term_list = {k: v for v, k in enumerate(term_code_list)}

    # Add the column as a mapping to the df
    instructor_list_ind = df.drop_duplicates(['Instructor ID', 'Term Code'], inplace=False)['Term Code'].map(dict_term_list).sort_values().index

    # Make sure that we have a unique list of instructors, starting from the top and dropping later instructors
    instr_list= []
    instr_ind_list = []
    for p in instructor_list_ind:
        if df.at()[p, 'Instructor ID'] not in instr_list:
            instr_list.append(df.at()[p, 'Instructor ID'])
            instr_ind_list.append(p)
        else:
            continue

    #########

    # Get the large df with all of the instructors
    df_main = pd.DataFrame(list(coll.find({'$and':[
    {"Instructor ID":{'$in':instructor_list}},
    {"Term Code": {'$in': CURRENT_SEMESTERS}}]}))) ## SAM - added term code here so that we only consider the instructor average over recent semesters

    for i in instr_ind_list:
        # need to average all ratings across all classes taught by each instructor
        # Do this by getting inst_id - all classes taught by this instructor
        # Necessary to cast int here since MongoDB cannot use Int64
        inst_id = int(df.at()[i, 'Instructor ID'])

        df_inst = df_main[(df_main['Instructor ID']==inst_id)] # Made df_inst once and then slice it for each instructor

        total = 0
        count = 0
        for x in df_inst.index:  # SAM - modified so we dont have to access collection here
            total += df_inst.at()[x, 'Avg Instructor Rating In Section']
            count += 1
        avg = round(total/count, 7)

        # Define a list of the term codes this instructor has taught
        term_code_list = [SEMESTER_MAPPINGS[str(i)] for i in list(df[(df['Instructor ID']==df.at()[i, 'Instructor ID'])]["Term Code"])]
        term_code_list = list(reversed(list(term_code_list)))
        terms_taught = ''
        for j in term_code_list:
            terms_taught += j
            if j != term_code_list[-1]:
                terms_taught+=', '
            else:
                break

        inst = {
            "name": df.at()[i, "Instructor First Name"] + ' ' + df.at()[i, "Instructor Last Name"],
            "crs rating": np.mean(list(df[(df['Instructor ID']==df.at()[i, 'Instructor ID'])]["Avg Instructor Rating In Section"])),
            "avg rating": avg,
            "term": terms_taught
            }

        ret_json["result"]["instructors"].append(inst)

    # SAM - reverse the results so that it plots most recent semesters first
    # ret_json['result']['instructors'] = list(reversed(ret_json['result']['instructors']))

    # SAM - Added a couple other features to ret_json for plotting a title on the frontend
    ret_json['result']['course name'] = str(df['Course Title'][0])
    ret_json['result']['dept name'] = str(df['Subject Code'][0])
    ret_json['result']['course number'] = str(df['Course Number'][0])
                
    return ret_json

def relative_dept_rating_figure_json_generator(db, valid_uuid):
    '''
    This function will build the json for the response to build the relative department rating figure 
    (2nd from top on the left side). The json has structure given in schema.json, for this rating.

    Inputs: db - a connection to the mongodb, i.e. db=mongo_driver()
            valid_uuid - a validated uuid from the 'uuid' field in the dataframe
    Returns: a valid json needed to generate the figure
    '''
    ##### Initial setup stuff
    

    # Define an instructor function to return the instructor dict based on passed parameters
    def instructor(last_name, first_name, mean_in_course, semester_taught, enrollment):
        return {'name':str(last_name)+' '+str(first_name), 'instructor mean in course':float(mean_in_course), 
                'semester':str(semester_taught), 'enrollment':int(enrollment)}

    # Search through each of the collections 
    for coll_name in COLLECTION_NAMES:
        coll = db.get_db_collection('reviews-db', coll_name)
        # Use the database query to pull needed data
        # cursor = coll.find({"course_uuid": uuid})
        cursor = coll.find({'$and':[
            {"course_uuid":valid_uuid},
            {"Term Code": {'$in': CURRENT_SEMESTERS}}
            ]
        })
        uuid_df = pd.DataFrame(list(cursor))

        if len(uuid_df)!=0:
            # This means we found uuid results in this collection, so we can skip the rest of the collections
            break
    
    # Add an error catching if the len(df) == 0
    if len(uuid_df)==0:
        print('The course_uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)
        raise Exception('The course_uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)

    # Get the list of the most popular Course Titles of this course, and trim any entries that arent the most popular course name
    most_frequent_course = uuid_df['Course Title'].value_counts().idxmax()
    uuid_df = uuid_df[(uuid_df['Course Title']==most_frequent_course)]

    # Make sure that the df is unique wrt Term Code and instructor
    uuid_df.drop_duplicates(subset=['Term Code', 'Instructor ID'], inplace=True)

    # Start by finding the most recent appearance of the course
    sem = most_recent_semester_ind(list(uuid_df['Term Code']))

    # Drop any from uuid that arent from the most recent semester
    uuid_df = uuid_df[(uuid_df['Term Code']==sem)]

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
    instructors = []
    for i in uuid_df.index:
        # Add a new list entry to instructors for each instructor in the df
        instructors.append(instructor(uuid_df.at()[i,'Instructor First Name'], uuid_df.at()[i,'Instructor Last Name'], 
            uuid_df.at()[i,'Avg Instructor Rating In Section'], SEMESTER_MAPPINGS[str(uuid_df.at()[i,'Term Code'])],
            uuid_df.at()[i, 'Instructor Enrollment']))
    # Reverse Instructors
    instructors = list(reversed(instructors))
    # Get the course ranking for the department from the uuid

    # Find all courses with given subject in ag_df
    subj_search = coll.find({'$and':[
            {'Subject Code':subj},
            {"Term Code":sem}
            ]
        })
    subj_df = pd.DataFrame(list(subj_search))

    # Sort out the repeat courses such that we only get a single entry for course rating
    # Get the number of unique courses in a given department
    num_courses = subj_df['Course Number'].nunique()


    # Drop all duplicates from subj_df
    subj_df.drop_duplicates(subset = ['Course Number'], inplace=True)

    # Sort the subj_df based on Avg Course Rating field
    subj_df.sort_values(by = 'Avg Course Rating', ascending=False,inplace=True)

    # Find placement within the sorted subj_df 
    subj_df.reset_index(inplace=True)
    crank = subj_df.index[subj_df['Course Number'] == cnum].tolist()[0] + 1
    total_dept = len(subj_df)
    
    # Build the json response
    response = {'result':{'course name':str(cname),
            'most recent sem': SEMESTER_MAPPINGS[str(sem)],
            'course number': int(cnum),
            'course ranking': int(crank), 
                          'dept':{'dept name': str(subj), 'courses in dept': int(total_dept) , 'dept mean': float(dept_mean), 'dept sd':float(dept_sd)}, 
                          'current course mean': float(cmean), 
                          'instructors':instructors}}
    return response

def timeseries_data_generator(db, valid_uuid):

    """
    This function will search for all courses that have occurred in the given timespan. It will then
    return the average course rating over time and the average department rating over this time scale (from pre-computed values),
    along with a list of instructors who have taught on this timescale and their ratings over their semesters taught
    
    """
    response = {'result':{'course over time':{}, 'dept over time':{}, 'instructors':[]}}

    # filter that we use on the collection
    coll_filter = {'$and':[
            {"course_uuid":valid_uuid},
            {"Term Code": {'$in': CURRENT_SEMESTERS}}]}

    for coll_name in COLLECTION_NAMES:
        coll = db.get_db_collection('reviews-db', coll_name)
        # Use the database query to pull needed data
        cursor = coll.find(coll_filter)
        
        # For whatever reason, generating a dataframe clears the cursor, so get population here
        population = cursor.count()

        # This assumes that there will be no same uuid's across the different collections, e.g. the same uuid in GCOE and JRCOE
        if population > 0:
            df = pd.DataFrame(list(cursor))
            break

    # Add an error catching if the len(df) == 0
    if population==0:
        raise Exception('The course_uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)

    # Get the list of the most popular Course Titles of this course, and trim any entries that arent the most popular course name
    most_frequent_course = df['Course Title'].value_counts().idxmax()
    df = df[(df['Course Title']==most_frequent_course)]

    # Fill the course number and name in the response
    response['result']['course number']=df['Course Number'].unique()[0]
    response['result']['course over time'] = {'ratings':[],'course name':df['Course Title'].unique()[0]}

    # Fill in the semesters that the course was found, in order of term
    term_codes = list(df['Term Code'].unique())
    mergeSort(term_codes)
    terms = [SEMESTER_MAPPINGS[str(term)] for term in term_codes]
    response['result']['course over time']['semesters'] = terms
    response['result']['dept over time'] = {'ratings':[],'semesters': terms}

    # Add in the course rating and dept ratings
    for tcode in term_codes:
        response['result']['course over time']['ratings'].append(list(df[(df['Term Code']==tcode)]['Avg Course Rating'])[0])
        response['result']['dept over time']['ratings'].append(list(df[(df['Term Code']==tcode)]['Avg Department Rating'])[0])

    # # Add in the instructors
    for i in df['Instructor ID'].unique():
        sub_df = df[(df['Instructor ID']==i)]
        instr_obj = {}
        instr_obj['name'] = sub_df['Instructor First Name'].unique()[0] + ' ' + sub_df['Instructor Last Name'].unique()[0]
        instr_obj['semesters']=[]
        instr_obj['ratings'] = []
        for j in sub_df['Term Code'].unique():
            instr_obj['semesters'].append(SEMESTER_MAPPINGS[str(j)])
            print(len(sub_df[(sub_df['Term Code']==j)]['Avg Instructor Rating In Section']))
            instr_obj['ratings'].append(list(sub_df[(sub_df['Term Code']==j)]['Avg Instructor Rating In Section'])[0])
        response['result']['instructors'].append(instr_obj)
    return response


    response = {'result': {'course number': 1411,
            'course over time':{
                'course name': 'This Course',
                # IT is VERY important that this list is in the correct order. You can order the input list via the mergeSort function; I had to use in Fig1 API modifications
                'semesters':['Fall 2015', 'Spring 2016', 'Summer 2017','Fall 2016', 'Spring 2017', 'Spring 2018'], # This determines number of data points
                'ratings':[4.212, 4.354, 3.898, 2.98, 3.45, 3.69]},
            'dept over time':{
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
            }}

    return response

def question_ratings_generator(db, valid_uuid):

    """
    This function will perform the following steps:
    1. take a db connection and a uuid and then find the uuid in the aggregated db collection
    2. Get lists of the course number, subject code, instructors, and term codes for the course appearances in the time period of interest
    3. Search in the non-aggregated db for the same course number, subject code, and instructors
    4. Aggregate the entries by professor and question number, if the professor doesnt have an entry giving them a '0' rating
    5. Convert the dataframe into a json and serve
    
    """
        # Construct the json containing necessary data for figure 1 on course page
    response = {"result": {"instructors": [], 'questions':[]}}

    # filter that we use on the collection
    coll_filter = {'$and':[
            {"course_uuid":valid_uuid},
            {"Term Code": {'$in': CURRENT_SEMESTERS}}]}

    for coll_name in COLLECTION_NAMES:
        coll = db.get_db_collection('reviews-db', coll_name)
        # Use the database query to pull needed data
        cursor = coll.find(coll_filter)
        
        # For whatever reason, generating a dataframe clears the cursor, so get population here
        population = cursor.count()

        # This assumes that there will be no same uuid's across the different collections, e.g. the same uuid in GCOE and JRCOE
        if population > 0:
            df = pd.DataFrame(list(cursor))
            break

    # Add an error catching if the len(df) == 0
    if population==0:
        raise Exception('The course_uuid '+ valid_uuid + ' was not found within the db collection ' + coll_name)

    # Get the list of the most popular Course Titles of this course, and trim any entries that arent the most popular course name
    most_frequent_course = df['Course Title'].value_counts().idxmax()
    df = df[(df['Course Title']==most_frequent_course)]

    # Now we need to drop the duplicates and only take columns of interest
    df = df.drop_duplicates(['Term Code', 'Instructor ID'])[['Term Code','Instructor ID','Subject Code', 'Course Number', 'Course Title']]
    df = df.rename(columns = {'Instructor ID':'Instructor 1 ID', 'Course Title':'Section Title'})

    # Build a cursor to search the full db collection for these conditions
    # Build it based on each row in the df
    full_db_filter = {'$or':[]}
    for i in range(len(df)):
        # Create the row filter
        row_filter = {'$and':[]}
        for col in list(df.columns):
            if col in ['Instructor 1 ID','Term Code','Course Number']:
                row_filter['$and'].append({col : int(df.iloc[i][col])}) # Encode the query as utf-8
            else:
                row_filter['$and'].append({col : str(df.iloc[i][col])}) # Encode the query as utf-8

        # Add row filter to full db filter
        full_db_filter['$or'].append(row_filter)

    # Use the filter to query the non-aggregated db
    full_db_coll_name = coll_name[11:] # This takes 'aggregated_GCOE' => GCOE

    coll = db.get_db_collection('reviews-db', full_db_coll_name)
    # Use the database query to pull needed data
    cursor = coll.find(full_db_filter)
    # print(cursor)
    df = pd.DataFrame(list(cursor))

    # Get the list of unique instructors
    instr_ids= list(df['Instructor 1 ID'].unique())
    instrs = []
    for i in instr_ids:
        instrs.append(df[(df['Instructor 1 ID']==i)].iloc[0]['Instructor 1 First Name'] + ' ' + df[(df['Instructor 1 ID'] == i)].iloc[0]['Instructor 1 Last Name'])
    print(instrs)
    response['result']['instructors'] = instrs

    # Get the list of unique question
    questions = list(df['Question'].unique())
    tot_responses = 0
    tot_weighted_mean_responses = 0
    for q in questions:
        q_ratings = []
        sub_df = df[(df['Question']==q)]
        for iD in instr_ids:
            sub_sub_df = sub_df[(sub_df['Instructor 1 ID']==iD)]
            if len(sub_sub_df)==0:
                q_ratings.append(0)
            else:
                weighted_means = sub_sub_df['Mean']*sub_sub_df['Responses']
                wms = weighted_means.sum()
                rs = sub_sub_df['Responses'].sum()
                tot_weighted_mean_responses+=wms
                tot_responses+=rs
                q_ratings.append(wms/rs)
                # Ya Yeet
            del sub_sub_df
        response['result']['questions'].append({'question':q, 'ratings':q_ratings})
    response['result']['avg_rating'] = tot_weighted_mean_responses/tot_responses

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
    # test = [201410, 201420, 201530, 201620, 201230, 201810]
    # mergeSort(test)
    # print(test)

    # pprint.pprint(course_instructor_ratings_api_generator(mongo_driver(),"engr1411"))
    # pprint.pprint(relative_dept_rating_figure_json_generator(mongo_driver(),"engr1411"))
    pprint.pprint(timeseries_data_generator(mongo_driver(), 'engr1411'))
    # pprint.pprint(question_ratings_generator(mongo_driver(),"engr1411"))
    #pprint.pprint(relative_dept_rating_figure_json_generator("engr2002"))
    #print(query_function(db,'thermodynamics','Queryable Course String'))



