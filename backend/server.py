from flask import Flask, jsonify
from data_loader import update_database

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Ping for /api/v0/ api endpoint'

@app.route('/api/v0/')
def api():
    return jsonify({'message': 'You have reached api root endpoint'})

if __name__ == '__main__':
    print("Updating database...")
    update_database()
    app.run(host='0.0.0.0', port=5050)
