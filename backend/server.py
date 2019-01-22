from flask import Flask, jsonify, request
from data_loader import update_database
from mongo import mongo_driver
import pprint
import pandas as pd

# Establish a database connection
DB_NAME = "reviews-db"
COLLECTION_NAME = "reviews-collection"

db = mongo_driver()
db_coll = db.get_db_collection(DB_NAME, COLLECTION_NAME)

app = Flask(__name__)

# useful for testing
# curl -i http://localhost:5050/api/v0/
# algolia for search utility

@app.route('/')
def hello_world():
	return 'Ping <a href="http://{}:5050/api/v0/">/api/v0/</a> for api'.format(str(request.remote_addr))

@app.route('/api/v0/', methods=['GET'])
def api():
	return jsonify({'message': 'You have reached api root endpoint'})

# SEARCH BY COURSE ENDPOINT
@app.route('/api/v0/searchbycourse')
def api_search_by_course():
	# Get the search query from the url string
	query = request.args.get('arg1', default = '--No Search Argument Provided--', type = str)

	# Find the query in the collection
	test_data = db_coll.find_one({'term_and_name':'Aggregated_gcoe_sp18'})
	# pprint.pprint(test_data)
	# Expand the cursor and construct the DataFrame
	df =  pd.DataFrame(list(test_data))
	# Delete the _id
	# del df['_id']
	print(df.head())

	return jsonify({'message': 'You have reached api root endpoint'})


# SEARCH BY INSTRUCTOR ENDPOINT
@app.route('/api/v0/searchbyinstructor')
def api_search_by_instructor():
	# Get the search query from the url string
	query = request.args.get('arg1', default = '--No Search Argument Provided--', type = str)
	return jsonify({'message': 'You have reached api root endpoint'})

# SEARCH BY DEPARTMENT ENDPOINT
@app.route('/api/v0/searchbydepartment')
def api_search_by_department():
	# Get the search query from the url string
	query = request.args.get('arg1', default = '--No Search Argument Provided--', type = str)
	return jsonify({'message': 'You have reached api root endpoint'})

@app.route('/api/v0/course/<string:course_string>', methods=['GET'])
def get_course(course_string):
    return jsonify({'course': course_string})

if __name__ == '__main__':
	print("Updating database...")
	# update_database()
	app.run(host='0.0.0.0', port=5050)
