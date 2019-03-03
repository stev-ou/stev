import unittest
from backend import mongo
from backend import data_aggregation
import pandas as pd


class basictest(unittest.TestCase):
    """ Basic tests """

    def test_dummy(self):
        return self.assertEqual(True, True)

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

    # Test the dataframe aggregation for unique entries 
    def test_dataframe_aggregation(self):

        '''
        This unit test will examine the aggregated dataframe and ensure it has no course entry repeats with the same 
        course title and instructor.
        '''
        # Test the data aggregation for unique entries
        df = pd.read_csv('backend/data/GCOE.csv')

        ag_df = data_aggregation.aggregate_data(df)

        # There should be no entries with the same course name, Instructor ID, and Term Code, so the below should be false
        num_repeats = len(ag_df[ag_df[['course_uuid', 'Term Code','Instructor ID']].duplicated() == True])

        return self.assertEqual(0, num_repeats)


if __name__ == '__main__':
    unittest.main()
