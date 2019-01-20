import unittest
from backend import mongo
from backend import data_aggregation


class basictest(unittest.TestCase):
    """ Basic tests """

    def test_dummy(self):
        return self.assertEqual(True, True)

    # Test for mongo.py
    def test_connection(self):
    	'''
    	This unittest will test whether the mongo driver is connecting successfully to:
    	Database name: "reviews-db"
    	collection name = "reviews-collection"
    	'''
    	try:

    		conn = mongo.mongo_driver()
    		DB_NAME = "reviews-db"
			COLLECTION_NAME = "reviews-collection"
			conn.get_db_collection(DB_NAME, COLLECTION_NAME)

    		conn_status = True
    	except:
    		conn_status = False

    	return self.assertEqual(True, conn_status)

    # Tests for database aggregation
    # Test the computation of the mean and sd for the data aggregation
	def compute_mean_sd(self):
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
	def dataframe_aggregation(self):
		# Test the data aggregation for unique entries
		df = pd.read_csv('backend/data/gcoe_sp18.csv')

		ag_df = data_aggregation.aggregate_data(df)

		# There should be no entries with the same course name and instructor name, so the below should be false
		num_repeats = len(ag_df[ag_df[['Course Title', 'Instructor Last Name', 'Instructor First Name']].duplicated() == True])

		return self.assertEqual(0, num_repeats)


if __name__ == '__main__':
    unittest.main()
