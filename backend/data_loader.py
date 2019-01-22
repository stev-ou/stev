import pandas as pd
from mongo import mongo_driver as db_conn
import json
import os

# aggregate_data.py contains the function to aggregate the data
from data_aggregation import aggregate_data

# Define the name of the database and the name of the collection. Insert each .csv record as a document within the collection
DB_NAME = "reviews-db"

def update_database(force_update=True):
    '''
    This function will update the desired database name and collection above with the data files (.csv) listed inside the data/ directory.
    '''
    # Establish DB connection
    conn = db_conn()

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
    data_files = os.listdir('data/')

    # Inform about non csv files
    for file in data_files: 
        if file[-4:] != '.csv':
            print('The file ' + file + ' is located in the data/ directory, but cannot be uploaded to the DB, because it is not a .csv')
            data_files.remove(file)
      
    for data_file in data_files:
        # If the collection doesnt exist or if the update is forced
        if conn.collection_existence_check(DB_NAME, data_file[:-4])==False or force_update:
            collection = conn.get_db_collection(DB_NAME, data_file[:-4])
            # Reading data into python from the csv
            df = pd.read_csv('data/'+data_file)

            # load the db for the given data file into a json format
            records = json.loads(df.T.to_json()).values()
        
            # try to update the database with the given data file 
            # can change $setonInsert to $set in the below lines to automatically reenter data(i.e. if the .csv files were changed)

            # result = collection.update_many({'term_and_name':data_file[:-4]},{'$set':{data_file[:-4]:records}}, upsert=True) 
            # result = collection.update_many({},{'$set':records}, upsert=True)
            result = collection.insert_many(records)
            # Update the user on what happened
#             if result.upserted_id != None:
            print('A collection called '+data_file[:-4] + ' was added to the database '+ DB_NAME + '.')
        else:
            print('A collection called '+data_file[:-4] + ' already exists in the database '+ DB_NAME + ' and was unmodified.')
            
#          # Check to see if the aggregated document already exists in the document in the database
        if conn.collection_existence_check(DB_NAME, 'aggregated_' +data_file[:-4])==False or force_update:

            collection = conn.get_db_collection(DB_NAME, 'aggregated_' + data_file[:-4])
            # Reading data into python from the csv
            df = pd.read_csv('data/'+data_file)
            # Create the aggregated database 
            ag_df = aggregate_data(df)

            # load the db for the given data file into a json format
            ag_records = json.loads(ag_df.T.to_json()).values()

             # Try to update the aggregated dataframe
            # can change $setonInsert to $set in the below lines to automatically reenter data(i.e. if the .csv files were changed)
            ag_result = collection.insert_many(ag_records)

            # Update the user on what happened
#             if result.upserted_id != None:
            print('A collection called aggregated_'+data_file[:-4] + ' was added to the database '+ DB_NAME + '.')
        else:
            print('A collection called aggregated_'+data_file[:-4] + ' already exists in the database '+ DB_NAME + ' and was unmodified.')
            
    # Return the connection to the collection
    return conn
    
    # 
if __name__ == '__main__':
    # Update the database
    update_database()
    
