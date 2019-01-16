import pandas as pd
from mongo import mongo_driver as db_conn
import json
import os

# aggregate_data.py contains the function to aggregate the data
from data_aggregation import aggregate_data

# Define the name of the database and the name of the collection. Insert each .csv record as a document within the collection
DB_NAME = "reviews-db"
COLLECTION_NAME = "reviews-collection"

def update_database():
    '''
    This function will update the desired database name and collection above with the data files (.csv) listed inside the data/ directory.
    '''
    # Establish DB connection
    conn = db_conn()
    collection = conn.get_db_collection(DB_NAME, COLLECTION_NAME)
    load_new_data(collection)


#     # load data into pandas and parse/clean
#     # TODO: implement cleaning etc
#     df = pd.read_csv("data.csv", header=None)
#     print("Found {} records.".format(len(df)))

#     # insert into db
#     records = json.loads(df.T.to_json()) #.values()

#     collections = ["COE_sp18"]
#     for collection in collections:
#         coll = conn.get_db_collection(DB_NAME, collection)
#         coll.update_many(
#            {},
#            {"$set": records },
#            upsert=True
#         )

def load_new_data(collection):
    '''
    Loads new data into the database, from the data folder. Each new .csv file is inserted into the database as a new collection. When inserting,
    the only check is to see if a collection with the name of the csv already exists in the database(i.e., if COE_Spring_2018 already exists in 
    the database, it is not inserted or modified. Else, it is inserted). Therefore, once the .csv files are placed into the data folder, do not 
    modify their contents, as the updates will not natively make it to the database.
    :inputs:
    connection: a connection to a collection within the DB
    :returns:
    connection: the same connection to the same collection of documents within the DB (the document set of the collection may be modified)
    '''
    
    # Gets the list of data documents to be checked and potentially inserted. Removes non csv files
    data_files = os.listdir('data')

    # Inform about non csv files
    for file in data_files: 
        if file[-4:] != '.csv':
            print('The file ' + file + ' is located in the data/ directory, but cannot be uploaded to the DB, because it is not a .csv')
            dat_files.remove(file)
      
    for data_file in data_files:
        # Check to see if the document already exists in the document in the database
        if collection.find({ 'term_and_name':data_file[:-4]}).limit(1).count(with_limit_and_skip=True) == False:
            # Reading data into python from the csv
            df = pd.read_csv('data/'+data_file)

            # load the db for the given data file into a json format
            records = json.loads(df.T.to_json()) # .values()
        
            # try to update the database with the given data file 
            # can change $setonInsert to $set in the below lines to automatically reenter data(i.e. if the .csv files were changed)
            result = collection.update_many({'term_and_name':data_file[:-4]},{'$setOnInsert':{data_file[:-4]:records}}, upsert=True) 

            # Update the user on what happened
#             if result.upserted_id != None:
            print('A document for '+data_file[:-4] + ' was added to the database collection '+ COLLECTION_NAME + '.')
        else:
            print('A document for '+data_file[:-4] + ' already exists in the database collection '+ COLLECTION_NAME + ' and was unmodified.')
            
         # Check to see if the aggregated document already exists in the document in the database
        if collection.find({ 'term_and_name':'Aggregated_'+data_file[:-4]}).limit(1).count(with_limit_and_skip=True) == False:
            # Reading data into python from the csv
            df = pd.read_csv('data/'+data_file)
            # Create the aggregated database 
            ag_df = aggregate_data(df)

            # load the db for the given data file into a json format
            records = json.loads(df.T.to_json()) # .values()
            ag_records = json.loads(ag_df.T.to_json()) # .values()

             # Try to update the aggregated dataframe
            # can change $setonInsert to $set in the below lines to automatically reenter data(i.e. if the .csv files were changed)
            ag_result = collection.update_many({'term_and_name':'Aggregated_'+data_file[:-4]},{'$setOnInsert':{'Aggregated_' + data_file[:-4]:ag_records}}, upsert=True)


            # Update the user on what happened
#             if result.upserted_id != None:
            print('A document for aggregated '+data_file[:-4] + ' was added to the database collection '+ COLLECTION_NAME + '.')
        else:
            print('A document for aggregated '+data_file[:-4] + ' already exists in the database collection '+ COLLECTION_NAME + ' and was unmodified.')


    # Return the connection to the collection
    return collection
    
    # 
if __name__ == '__main__':
    # Update the database
    update_database()
    