import datetime 
import pprint
from pymongo import MongoClient

# create mongo client (just connecting to local db)
client = MongoClient()
client = MongoClient('localhost', 27017)

# get the database and a collection in the database
db = client.test_database
collection = db.test_collection

# make a post and attempt to insert
post = {
        "user": "Sam",
        "text": "Remi is a sick lad",
        "date": datetime.datetime.utcnow() 
       }

post_id = collection.insert_one(post).inserted_id

print(post_id)

pprint.pprint(collection.find_one({"user": "Sam"}))

