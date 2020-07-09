from bs4 import BeautifulSoup as bs 
from splinter import Browser
import time
import pymongo
import pandas as pd

#2004-2018

####################################################
####################################################

def init_browser():
    return Browser('chrome', headless = False)

####################################################
####################################################

def pull_table(browser, country, year, category):
    bigTable = {
        'Country': country,
        'Category': category,
        'Year': year #just some metadata to set up. visually the table will display the year and country as well
    }
    table = browser.find_by_css('table')
    headers = table.find_by_css('th.m-data-table__th')
    tableDict = {}
    for header in headers:
        if '.' in header.text:
            tableDict[header.text.replace('.','')] = []
        else:
            tableDict[header.text] = []
#     print('pull table debug 1')
    rowsHTML = table.find_by_css('table tr')
#     print('pull table debug 2')
    rowsDict = {}
    currUnit = []
    headers = []
    l = 0
    for rows in rowsHTML:
        row = []
        for element in rows.find_by_css('td'): #create a row item, will be empty if it's the header
            row.append(element.text)
        if l == 0: #append headers to headers list
            for element in rows.find_by_css('th.m-data-table__th'):
                headers.append(element.text)
#             print('this is the header')
#             print(headers)
            l+=1
            continue
        title = row[0]
        if '.' in title:
            title = title.replace('.','')
        elif title == '':
            currUnit = [] #currUnit gets updated every time a new unit row is found
            for element in row:
                currUnit.append(element)
                
            #---------------
            #EDGE CASE: Units row less than all categories
            if len(currUnit) < len(headers):
                print('EDGE CASE FEWER UNITS')
                for x in range(0, len(headers) - len(currUnit) + 1):
                    currUnit.append('UNIT N/A')
            #---------------

            #debug statements:
#             print('this is a unit row')
#             print(currUnit)

            continue #this is a unit row and thus not to be appended as its own row
        rowsDict[title] = []
#         print('pull table debug 6')

        k = 0
        for value in row: #now add the row to the dictionary
            if k == 0:
                k+=1
                continue
            if value != '':
#                 print(' '.join([''.join(value.split('\u202f')),currUnit[i]]))
                newValue = ' '.join([''.join(value.split('\u202f')),currUnit[k]])
#                 print(f'updating {rowsDict[title]} with {newValue}')
                rowsDict[title].append(' '.join([''.join(value.split('\u202f')),currUnit[k]]))#titled after first row index
            else:
                if currUnit[k] == 'UNIT N/A':
                    rowsDict[title].append(currUnit[k])
                else:
                    rowsDict[title].append(f'0 {currUnit[k]}')
            k+=1
        i = 0
        for col in tableDict:
            tableDict[col].append(rowsDict[title][i])
            i+=1
    tableDict['Category'] = []
    for row in rowsDict:
        tableDict['Category'].append(row) #append the title of each row, not the row
    
    #now to establish the dataframe/csv file
    bigTable['data'] = tableDict
    tableDict = pd.DataFrame(tableDict)
    tableDict.to_csv(f'../Project 2 Data/{country}_{year}_{category}.csv', index=True)
    print('\n-----------------dataframe to csv-------------------')
    return bigTable

####################################################
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
####################################################

browser = init_browser()

####################################################
####################################################

countries = grab_countries(browser)

####################################################
####################################################

conn = 'mongodb://localhost:27017'

client = pymongo.MongoClient(conn)

db = client.IEA_db

####################################################
####################################################

browser = init_browser()

countriesWithData = ['Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Democratic Republic of the Congo', 'Denmark', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Eritrea', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Gabon', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan', 'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Luxembourg', 'Malaysia', 'Malta', 'Mauritius', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovenia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Yemen', 'Zambia', 'Zimbabwe', 'United States', 'Albania', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Benin', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria']
country = 'USA'
energy = 'ELECTRICITY'
year = '2017'
url = f"https://www.iea.org/data-and-statistics/data-tables?country={country}&energy={energy}&year={year}"
browser.visit(url)
time.sleep(1)
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

for country in countriesWithData:
    browser.find_by_css("button.a-dropdown__trigger.f-title-8")[1].click()
    time.sleep(1)
    browser.find_by_css('div.a-dropdown__search input').fill(country)
    time.sleep(1)
    try:
        browser.find_by_css("button.s-active")[0].click()
        time.sleep(1)
        i = 0
        for year in years:
            browser.find_by_css('button.a-dropdown__trigger.f-title-8')[2].click()
            time.sleep(1)
            browser.find_by_css('div.a-dropdown__options ul')[2].find_by_css('li button')[i].click()
            j = 0
            time.sleep(1.5)
            for category in series:
                browser.find_by_css('button.a-dropdown__trigger.f-title-8')[0].click()
                time.sleep(1.5)
                browser.find_by_css('div.a-dropdown__options ul')[0].find_by_css('li button')[j].click()
                pull_table(browser, country, year, category)
                j+=1
            i+=1
    except:
        print(f'{country} not in database')
        browser.visit(url) 
        time.sleep(2)

print('\n-------------------- TASK COMPLETED --------------------')