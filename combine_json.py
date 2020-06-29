import json
import pymongo

def combine_json():
    conn = "mongodb://localhost:27017"
    client = pymongo.MongoClient(conn)

    with open("static/data/custom.geo.json") as f:
        data = json.load(f)

    db = client.proj2_data

    collections = ['coal_consumption', 'natural_gas_production', 'renewables_in_electricity_production',
               'oil_consumption', 'energy_production', 'coal_production', 'electricity_production',
               'electricity_consumption', 'energy_consumption', 'wind_and_solar_in_electricity_production',
               'oil_production', 'natural_gas_consumption']

    years = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", 
            "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", 
            "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"]

    for feature in data["features"]:
        for collection in collections:
            for place in db[f"{collection}"].find():
                if feature["properties"]["name"] == place["Country"]:
                    for year in years:
                        feature["properties"][f"{collection}_{year}"] = place[f"{year}"]
                else:
                    pass

    with open("static/data/presenting.json", 'w') as fp:
        json.dump(data, fp)

combine_json()