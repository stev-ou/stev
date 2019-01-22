from flask import Flask, jsonify, request
from data_loader import update_database

app = Flask(__name__)

# useful for testing
# curl -i http://localhost:5050/api/v0/

@app.route('/')
def hello_world():
    return 'Ping <a href="http://{}:5050/api/v0/">/api/v0/</a> for api'.format(str(request.remote_addr))

@app.route('/api/v0/', methods=['GET'])
def api():
    return jsonify({'message': 'You have reached api root endpoint'})

@app.route('/api/v0/course/<string:course_string>', methods=['GET'])
def get_course(course_string):
    return jsonify({'course': course_string})

if __name__ == '__main__':
    print("Updating database...")
    update_database()
    app.run(host='0.0.0.0', port=5050)
