from flask import Flask
from data_loader import update_database

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Ping for api endpoint'

if __name__ == '__main__':
    print("Updating database...")
    update_database()
    app.run(host='127.0.0.1', port=5050)
