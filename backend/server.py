from flask import Flask, jsonify, request
from data_loader import update_database
from mongo import mongo_driver
from bson.json_util import dumps
import pandas as pd
import json

# Establish a database connection
DB_NAME = "reviews-db"
COLLECTION_NAME = "reviews-collection"

db = mongo_driver()

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

# course search
@app.route('/api/v0/courses')
def course_api():
    # Get the search query from the url string
    query = request.args.get('code', default='', type=str)

    if query == '':
        # list all courses
        return jsonify({"default": "list"})

    # Find the query in the collection
    collection = db.get_db_collection(DB_NAME, "gcoe_sp18")
    test_data = collection.find_one({'Subject Code':'ENGR'})

    def relative_dept_rating_figure():
        '''
        This function will build the json for the response to build the relative department rating figure 
        (2nd from top on the left side). The json has structure given in schema.json, for this rating.
        Inputs: valid_query - a validated query from the co

        '''
        return


    return jsonify(dumps(test_data))


# instructor search
@app.route('/api/v0/instructors')
def instructor_api():
    # Get the search query from the url string
    query = request.args.get('name', default='', type=str)

    if query == '':
        # list all instructors
        return jsonify({"default": "list"})

    # Find the query in the collection
    collection = db.get_db_collection(DB_NAME, "gcoe_sp18")
    test_data = collection.find_one({'Subject Code':'ENGR'})

    return jsonify(dumps(test_data))


# dept search
@app.route('/api/v0/departments')
def department_api():
    # Get the search query from the url string
    query = request.args.get('department', default='', type=str)

    if query == '':
        # list all possible departments
        return jsonify({"default": "list"})

    # Find the query in the collection
    collection = db.get_db_collection(DB_NAME, "gcoe_sp18")
    test_data = collection.find_one({'Subject Code':'ENGR'})

    return jsonify(dumps(test_data))

### deprecated
# courses
@app.route('/api/v0/course/<string:course_string>', methods=['GET'])
def get_course(course_string):
    return jsonify({'course': course_string})

if __name__ == '__main__':
    print("Updating database...")
    update_database()
    print("Done.")
    print("Starting server...")
    app.run(host='0.0.0.0', port=5050)
