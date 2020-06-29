import pandas as pd
import pymongo
import json

def import_csv(collection_name, filepath):
    conn = "mongodb://localhost:27017"
    client = pymongo.MongoClient(conn)

    db = client.proj2_data

    collection = db[f"{collection_name}"]

    data = pd.read_csv(filepath)
    data_json = json.loads(data.to_json(orient='records'))
    collection.delete_many({})
    collection.insert_many(data_json)

# import_csv("coal_consumption", "static/data/coal_and_lignite_domestic_consumption.csv")
# import_csv("coal_production", "static/data/coal_and_lignite_production.csv")
# import_csv("electricity_consumption", "static/data/electricity_domestic_consumption.csv")
# import_csv("electricity_production", "static/data/electricity_production.csv")
# import_csv("natural_gas_consumption", "static/data/natural_gas_domestic_consumption.csv")
# import_csv("natural_gas_production", "static/data/natural_gas_production.csv")
# import_csv("oil_consumption", "static/data/oil_products_domestic_consumption.csv")
# import_csv("oil_production", "static/data/refined_oil_production.csv")
# import_csv("renewables_in_electricity_production", "static/data/share_of_renewables_in_electricity_production.csv")
# import_csv("wind_and_solar_in_electricity_production", "static/data/share_of_wind_and_solar_in_electricity_production.csv")
# import_csv("energy_consumption", "static/data/total_energy_consumption.csv")
# import_csv("energy_production", "static/data/total_energy_production.csv")



