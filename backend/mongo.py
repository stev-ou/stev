import datetime 
import pprint
from pymongo import MongoClient
import sys


class mongo_driver():
    def __init__(self):
        # create mongo client (just connecting to local db)
        self.client = MongoClient("mongodb+srv://zach:G8GqPsUgP6b9VUvc"
        "@cluster0-svcn3.gcp.mongodb.net/test?retryWrites=true")

    def get_client(self):
        return self.client

    def get_db(self, db_name):
        return self.client[db_name]

    def get_db_collection(self, db_name, collection_name):

        db = self.get_db(db_name)
        collection = db[collection_name]
        return collection

    def collection_existence_check(self, db_name, check_collection):
        # Checks to see if a collection exists within a database
        db = self.get_db(db_name)
        collections = db.collection_names()
        if check_collection in collections:
            return True
        else:
            return False


if __name__ == '__main__':
    # make a post and attempt to insert
    post = {
            "user": "Sam",
            "text": "Remi is a sick lad",
            "date": datetime.datetime.utcnow() 
          }

    db = mongo_driver()
    collection = db.get_db_collection("test_db", "test_col")
    post_id = collection.insert_one(post).inserted_id

    print(post_id)

    pprint.pprint(collection.find_one({"user": "Sam"}))

