import pandas as pd
from mongo import mongo_driver as db_conn
import json
import os

DB_NAME = "reviews-db"

def update_database():

    # this single function will call two others:
    # TODO: load_new_data()
    # TODO: aggregate_new_data()

    conn = db_conn()


    # load data into pandas and parse/clean
    # TODO: implement cleaning etc
    df = pd.read_csv("data.csv", header=None)
    print("Found {} records.".format(len(df)))

    # insert into db
    records = json.loads(df.T.to_json()) #.values()

    collections = ["COE_sp18"]
    for collection in collections:
        coll = conn.get_db_collection(DB_NAME, collection)
        coll.update_many(
           {},
           {"$setOnInsert": records },
           upsert=True
        )

def load_new_data():
    '''
    Loads new data into the database, using 'upsert' option to
    :return:
    '''
if __name__ == '__main__':
    # establish db connection
    conn = db_conn()
    collection = conn.get_db_collection(DB_NAME, 'test')

    # load data into pandas and parse/clean
    # TODO: implement cleaning etc
    df = pd.read_csv("data.csv")
    print("Found {} records.".format(len(df)))

    print(df.head())

    # insert into db
    records = json.loads(df.T.to_json()).values()
    collection.insert_many(records)

    print("Done")
