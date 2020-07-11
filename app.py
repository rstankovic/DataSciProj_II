from flask import Flask, render_template, jsonify, request, redirect
import pymongo
from config import username, password
from flask_restful import Resource, Api
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

######################
#SETTING UP DB CONNECTION
client = pymongo.MongoClient(f"mongodb+srv://{username}:{password}@datasciproj2.iadrt.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client.IEA
######################
#establish app and api
app = Flask(__name__)
api = Api(app)
######################
#FUNCTIONS FOR PIE CHART RENDERING
def drawPieChart(energyseries):
    labels = []
    sizes = []
    country = energyseries['Country']
    year = energyseries['Year']
    category = energyseries['Category']
    notvalues = ['Country','Year','Category','_id', 'Total']
    colors = []
    explode = []
    possiblecolors = ['#932828','#84AE91','#C6C064','#C66464','#83C664','#64C6C2','#64A6C6','#6496C6','#6B64C6','#A264C6','#C664B4','#B35959']

    i = 0
    for col in energyseries:
        
        if col not in notvalues:
            if energyseries[col].split(' ')[0] == '0':
                continue
            eh = energyseries[col]
            labels.append(f'{col}: {eh}')
            sizes.append(int(eh.split(' ')[0]))
            colors.append(possiblecolors[i])
            explode.append(.1)
            i+=1
    print(sizes)
    #adjusting all sizes to percentages, labels will have true values
    # total = sum(sizes)
    # for x in range(0,len(sizes)-1):
    #     sizes[x] = sizes[x]/total
    plt.clf()
    plt.pie(sizes, explode = explode, labels = labels, colors = colors, autopct = '%1.1f%%', startangle = 140)
    plt.legend(loc='lower left', prop={'size': 6})
    plt.title(f'Percentages of each energy type for {category} in {country} during {year}.', fontsize=5)
    plt.savefig('Project 2 Data/plot.png')
    plt.savefig('static/images/test_plot.png')

######################

@app.route("/")
def index():
    return(render_template("index.html"))

@app.route("/yearbook/line")
def line():
    return(render_template("line.html"))

@app.route('/api')
def APIdataBaseSearch():
    params = request.args.to_dict()
    jsonDict = {}
    jsonDict['Disclaimer'] = 'Based on IEA data from the IEA (2018) Monthly Oil Data Service, www.iea.org/statistics. All rights reserved; as modified by Christian.'
    jsonDict['Data'] = []
    for result in db.Balances.find(params):
        newResult = (pd.Series(result).drop(labels=['_id'])).to_dict()
        jsonDict['Data'].append(newResult)
    return jsonDict

@app.route('/database/', methods = ['GET','POST'])
def dataBaseSearch():
    if request.method == 'POST':
        energycategory = request.form['energycategory-select']
        category = request.form['category-select']
        country = request.form['country-select']
        year = request.form['year-select']

        params = {
            'Country': country,
            'Year': year,
            'Category': category
        }
        
        if energycategory == 'Balances':
            result = {}
            for r in db.Balances.find(params):
                result = r
            if result != {}:
                del result['_id'] #don't need the id
                drawPieChart(result)
        elif energycategory =='Renewables & waste':
            result = {}
            for r in db.Balances.find(params):
                result = r
            if result != {}:
                del result['_id'] #don't need the id
                drawPieChart(result)
            
        return(redirect('/database/'))
    
    return(render_template('database.html'))

@app.route('/database/render/', methods =['GET','POST'])
def plot_png():
    return(render_template('dataimage.html'))



######################

if __name__ == "__main__":
    app.run(debug=True)
