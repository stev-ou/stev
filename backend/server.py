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

@app.route('/api/v0/<int:number>', methods=['GET'])
def hi_number(number):
    return jsonify({'your number': number})

if __name__ == '__main__':
    print("Updating database...")
    update_database()
    app.run(host='0.0.0.0', port=5050)
