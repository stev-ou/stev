from flask import Flask, jsonify, request
from flask_cors import CORS
from data_loader import update_database
from mongo import mongo_driver
from bson.json_util import dumps
import pandas as pd
import json
from api_functions import *

# Establish a database connection
DB_NAME = "reviews-db"
COLLECTION_NAME = "reviews-collection"

# base route for this api version
base_api_route = '/api/v0/'

db = mongo_driver()

app = Flask(__name__)
CORS(app)
# useful for testing
# curl -i http://localhost:5050/api/v0/
# algolia for search utility
@app.route('/')
def hello_world():
    return 'Ping <a href="http://{}/api/v0/">/api/v0/</a> for api'.format(str(request.remote_addr))

@app.route(base_api_route, methods=['GET'])
def api():
    return jsonify({'message': 'You have reached api root endpoint'})

# General course search
@app.route(base_api_route + 'courses/')
def course_search_api():
    # Get the search query from the url string and convert to lowercase
    query = request.args.get('course', default='', type=str).lower()

    ## Deprecated
    # Use the query function to search for the query
    #result_list = query_function(db, query, 'Queryable Course String')

    return jsonify({'result':[query]})

### APIs for course search
# Figure 1 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure1', methods=['GET'])
def course_figure_1_data_api(course_uuid):
    response = CourseFig1Table(db, course_uuid)

    return jsonify(response)

# Figure 2 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure2', methods=['GET'])
def course_figure_2_data_api(course_uuid):
    response = CourseFig2Chart(db, course_uuid)

    return jsonify(response)

# Figure 3 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure3', methods=['GET'])
def course_figure_3_data_api(course_uuid):
    response = CourseFig3Timeseries(db, course_uuid)

    return jsonify(response)

# Figure 4 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure4', methods=['GET'])
def course_figure_4_data_api(course_uuid):
    response = CourseFig4TableBar(db, course_uuid)

    return jsonify(response)


## APIs for Instructor Search
# instructor search
@app.route(base_api_route+'instructors/')
def instructor_api():
    # Get the search query from the url string
    query = request.args.get('instructor', default='', type=str)
    # Pass it right back for now, for consistency with course

    return jsonify({'result':[query]})

# Figure 1 api 
@app.route(base_api_route+'instructors/<int:instructor_id>/figure1', methods=['GET'])
def instructor_figure_1_data_api(instructor_id):
    response = InstructorFig1Table(db, instructor_id)

    return jsonify(response)

# Figure 2 api 
@app.route(base_api_route+'instructors/<int:instructor_id>/figure2', methods=['GET'])
def instructor_figure_2_data_api(instructor_id):
    response = InstructorFig2Timeseries(db, instructor_id)

    return jsonify(response)

# Figure 3 api 
@app.route(base_api_route+'instructors/<int:instructor_id>/figure3', methods=['GET'])
def instructor_figure_3_data_api(instructor_id):
    response = InstructorFig3TableBar(db, instructor_id)

    return jsonify(response)

# dept search
@app.route(base_api_route+'departments')
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

if __name__ == '__main__':
    print("Updating database...")
    # print('IN DEVELOPMENT MODE; NO DATABASE UPDATE PERFORMED')
    update_database(force_update=False)
    print("Done.")
    print("Starting server...")
    app.run(host='0.0.0.0', port=80)
