import pprint
import json
from mongo import mongo_driver
import pandas as pd


def get_figure_one_data(uuid):
	db = mongo_driver()
	coll = db.get_db_collection('reviews-db', 'aggregated_gcoe_sp18')
	cursor = coll.find({"uuid": uuid})
	df = pd.DataFrame(list(cursor))

	# Construct the json containing necessary data for figure 1 on course page
	ret_json = {"result": {"instructors": []}}
	for row in df.itertuples():
		# need to average all ratings across all classes taught by each instructor
		df_inst = pd.DataFrame(list(coll.find({"Instructor ID": row[8]})))
		total = 0
		count = 0
		for inst_row in df_inst.itertuples():
			total += inst_row[3]
			count += 1
		avg = round(total/count, 7)

		inst = {"name": row[7] + ' ' + row[9], "crs_rating": row[3], "avg_rating": avg}
		ret_json["result"]["instructors"].append(inst)
	pprint.pprint(ret_json)


get_figure_one_data("engr2002")