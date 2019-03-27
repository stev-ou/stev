import unittest
import mongo
import json
import data_aggregation
import pandas as pd
from api_functions import *

class basictest(unittest.TestCase):
    """ Basic tests """

    # Test for mongo.py
    def test_connection(self):
        '''
        This unittest will test whether the mongo driver is connecting successfully to:
        Database name: "reviews-db"
        collection name = "aggregated_GCOE"
        '''
        try:
            conn = mongo.mongo_driver()
            DB_NAME = "reviews-db"
            COLLECTION_NAME = "aggregated_GCOE"
            conn.get_db_collection(DB_NAME, COLLECTION_NAME)
            conn_status = True
        except:
            conn_status = False

        return self.assertEqual(True, conn_status)

    # Tests for database aggregation
    # Test the computation of the mean and sd for the data aggregation
    def test_compute_mean_sd(self):
        '''
        This unit test will examine the formulae for computing weighted mean and sd from the data aggregation script.
        '''

        # Test the combined means
        mean_sd = data_aggregation.combine_standard_deviations([4,6],[50,9], [47,100], [1,1]) # sd, means, populations, weights
        # Note that the above returns a tuple of combined (mean, sd) and thus tests for both mean and sd

        if round(mean_sd[0], 2) == 22.11 and round(mean_sd[1], 2) == 19.88:
            status = True
        else: 
            status = False

        # Validated the above functions for combined sd and combined means with this website, albeit 
        # there was No entry or validation for the weighting
        # https://www.statstodo.com/CombineMeansSDs_Pgm.php
        # * Note that my formula uses n instead of n-1 for combining SDs, so expect some small differences in the final result
        return self.assertEqual(True, status)

    # # Test the dataframe aggregation for unique entries 
    def test_dataframe_aggregation(self):

        '''
        This unit test will examine the aggregated dataframe and ensure it has no course entry repeats with the same 
        course title and instructor.
        '''
        # Test the data aggregation for unique entries
        df = pd.read_csv('data/GCOE.csv')

        ag_df = data_aggregation.aggregate_data(df)

        # There should be no entries with the same course name, Instructor ID, and Term Code, so the below should be false
        num_repeats = len(ag_df[ag_df[['course_uuid', 'Term Code','Instructor ID']].duplicated() == True])

        return self.assertEqual(0, num_repeats)

    # Test the current course apis to make sure that they are at least returning a valid json
    def test_course_api_endings(self):
        '''
        This unit test will ping each of the currently created api endings with a variety of different courses to make sure they hit.

        '''
        # Define the currently working courses
        course_function_list = [CourseFig1Table, CourseFig2Chart, CourseFig3Timeseries, CourseFig4TableBar] 
        course_test_list = ['engr1411', 'ame3143', 'bme3233', 'ece5213', 'edss3553', 'edah5023', 'edel4980']
        # Create connection to the db
        db = mongo.mongo_driver()
        print('Testing the api functions for the following courses: ')
        for course in course_test_list:
            print(course)
            for func in course_function_list:
                try:
                    response = func(db, course)
                    json.loads(json.dumps(response))
                except:
                    return self.assertEqual(True, False)

        # Try the function for autocomplete for all courses
        try:
            print('SearchAutocomplete for all courses')
            response = SearchAutocomplete(db, search_type='course')
            json.loads(json.dumps(response))
        except:
            return self.assertEqual(True, False)

        return self.assertEqual(True, True)

    # Test the current instructor apis to make sure that they are at least returning a valid json
    def test_instructor_api_endings(self):
        '''
        This unit test will ping each of the currently created api endings with a variety of different instructors to make sure they hit.

        '''
        # Define the currently working courses
        instructor_function_list = [InstructorFig1Table, InstructorFig2Timeseries, InstructorFig3TableBar] 
        instructor_test_list = [113007898, 112131147, 113316966, 112114393, 112111442, 113841484, 113320095]

        # Create connection to the db
        db = mongo.mongo_driver()
        print('Testing the api functions for the following instructors: ')
        for instr in instructor_test_list:
            print(instr)
            for func in instructor_function_list:
                try:
                    response = func(db, instr)
                    json.loads(json.dumps(response))
                except:
                    return self.assertEqual(True, False)

        # Try the function for autocomplete for all instructors
        try:
            print('SearchAutocomplete for all instructors')
            response = SearchAutocomplete(db, search_type='instructor')
            json.loads(json.dumps(response))
        except:
            return self.assertEqual(True, False)

        return self.assertEqual(True, True)

if __name__ == '__main__':
    test_current_api_endings()
    # unittest.main()
