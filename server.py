from flask import Flask
from flask_graphql import GraphQLView
from schema import schema
from data_loader import update_database

app = Flask(__name__)

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True)
    )

@app.route('/')
def hello_world():
    return 'Ping /graphql for api endpoint'

if __name__ == '__main__':
    print("Updating database...")
    update_database()
    app.run(host='127.0.0.1', port=5050)
