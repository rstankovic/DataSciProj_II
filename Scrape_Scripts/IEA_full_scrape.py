from bs4 import BeautifulSoup as bs 
from splinter import Browser
import time
import pymongo
import pandas as pd

####################################################

def init_browser():
    return Browser('chrome', headless = False)

####################################################

def pull_table(browser, country, year, category):
    bigTable = {
        'Country': country,
        'Energy Category': category,
        'Year': year #just some metadata to set up. visually the table will display the year and country as well
    }
    table = browser.find_by_css('table')
    headers = table.find_by_css('th.m-data-table__th')
    tableDict = {}
    for header in headers:
        if '.' in header.text:
            tableDict[header.text.replace('.','')] = []
    rowsHTML = table.find_by_css('tr.m-data-table__row')
    rowsDict = {}
    unitsList = []
    units = table.find_by_css('tr.m-data-table__tr--units').find_by_css('td')
    for unit in units:
        unitsList.append(unit.text)
    for rows in rowsHTML:
        title = rows.find_by_css('td')[0].text
        if '.' in title:
            title = title.replace('.','')
        rowsDict[title] = []
        row = rows.find_by_css('td.m-data-table__data')
        for value in row:
            if ''.join(value.text.split('\u202f')) != '':
                rowsDict[title].append(''.join(value.text.split('\u202f')))
            else:
                rowsDict[title].append('0')
    for row in rowsDict:
        i = 0
        for col in tableDict:
            value = ' '.join([rowsDict[row][i],unitsList[i+1]])
            if '.' in value:
                value = value.replace('.','')
            tableDict[col].append(value)
    tableDict['Classification'] = []
    for row in rowsDict:
        tableDict['Category'].append(row)
    bigTable['data'] = tableDict
    print(pd.DataFrame(tableDict).head())
    db.country_data.insert_one(bigTable)

####################################################

def grab_countries(browser):
    countries = []
    url = 'https://www.worldometers.info/geography/alphabetical-list-of-countries/'
    browser.visit(url)
    rows = browser.find_by_css('tbody tr')
    for row in rows:
        country = row.find_by_css('td')[1].text
        countries.append(country)
    return countries
####################################################

browser = init_browser()

####################################################

countries = grab_countries(browser)

####################################################

conn = 'mongodb://localhost:27017'

client = pymongo.MongoClient(conn)

db = client.IEA_db

####################################################

country = 'USA'
energy = 'ELECTRICITY'
year = '2017'
url = f"https://www.iea.org/data-and-statistics/data-tables?country={country}&energy={energy}&year={year}"
browser.visit(url)
time.sleep(.5)
soup = bs(browser.html,'html.parser')
energy_select = soup.find('div', {'class':'a-dropdown__select'})
energy_types = soup.find_all('option')
country_select = soup.find('')
years = []
series = []
for option in energy_types:
    if (option.text.strip().isnumeric()):
        years.append(option.text.strip())
    else:
        series.append(option.text.strip())

for country in countries:
    browser.find_by_css("button.a-dropdown__trigger.f-title-8")[1].click()
    time.sleep(.8)
    browser.find_by_css('div.a-dropdown__search input').fill(country)
    time.sleep(.8)
    try:
        browser.find_by_css("button.s-active")[0].click()
        time.sleep(.8)
        i = 0
        for year in years:
            browser.find_by_css('button.a-dropdown__trigger.f-title-8')[2].click()
            time.sleep(.8)
            browser.find_by_css('div.a-dropdown__options ul')[2].find_by_css('li button')[i].click()
            i+=1
            j = 0 
            time.sleep(.8)
            for category in series:
                browser.find_by_css('button.a-dropdown__trigger.f-title-8')[0].click()
                time.sleep(.8)
                browser.find_by_css('div.a-dropdown__options ul')[0].find_by_css('button')[j].click()
                pull_table(browser, country, year, category)
                j+=1
            i+=1
    except:
        print(f'{country} not in database')
        browser.visit(url) 
        time.sleep(2)

print('\n-------- TASK COMPLETED --------')