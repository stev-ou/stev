import pandas as pd
from mongo import mongo_driver as db_conn
import json

DB_NAME = "reviews-db"

if __name__ == '__main__':
    # establish db connection
    conn = db_conn()
    collection = conn.get_db_collection(DB_NAME, test_collection)

    # load data into pandas and parse/clean
    # TODO: implement cleaning etc
    df = pd.read_csv("data.csv", header=None)
    print(df.head())

    # insert into db
    records = json.loads(df.T.to_json()).values()
    collection.insert_many(records)
