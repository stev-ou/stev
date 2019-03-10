from flask import Flask, jsonify, request
from flask_cors import CORS
from data_loader import update_database
from mongo import mongo_driver
from bson.json_util import dumps
import pandas as pd
import json
from api_functions import query_function, course_instructor_ratings_api_generator, relative_dept_rating_figure_json_generator, timeseries_data_generator, question_ratings_generator

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

    # Use the query function to search for the query
    result_list = query_function(db, query, 'Queryable Course String')

    return jsonify({'result':result_list})


# Figure 1 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure1', methods=['GET'])
def figure_1_data_api(course_uuid):
    response = course_instructor_ratings_api_generator(db, course_uuid)

    return jsonify(response)

# Figure 2 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure2', methods=['GET'])
def figure_2_data_api(course_uuid):
    response = relative_dept_rating_figure_json_generator(db, course_uuid)

    return jsonify(response)

# Figure 3 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure3', methods=['GET'])
def figure_3_data_api(course_uuid):
    response = timeseries_data_generator(db, course_uuid)

    return jsonify(response)

# Figure 4 api 
@app.route(base_api_route+'courses/<string:course_uuid>/figure4', methods=['GET'])
def figure_4_data_api(course_uuid):
    response = question_ratings_generator(db, course_uuid)

    return jsonify(response)

# instructor search
@app.route(base_api_route+'instructors')
def instructor_api():
    # Get the search query from the url string
    query = request.args.get('instructor', default='', type=str)

    if query == '':
        # list all instructors
        return jsonify({"default": "list"})

    # Find the query in the collection
    collection = db.get_db_collection(DB_NAME, "gcoe_sp18")
    test_data = collection.find_one({'Subject Code':'ENGR'})

    return jsonify(dumps(test_data))


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

### deprecated
# # courses
# @app.route('/api/v0/course/<string:course_string>', methods=['GET'])
# def get_course(course_string):
#     return jsonify({'course': course_string})

if __name__ == '__main__':
    # print("Updating database...")
    print('IN DEVELOPMENT MODE; NO DATABASE UPDATE PERFORMED')
    # update_database(force_update=False)
    print("Done.")
    print("Starting server...")
    app.run(host='0.0.0.0', port=80)
