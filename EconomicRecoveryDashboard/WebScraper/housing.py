import pandas as pd
import censusdata
from tabulate import tabulate
import requests

##Fetches median housing cost in spokane county in 2019

data = censusdata.download('acs1', 2019, censusdata.censusgeo([('state', '53'), ('county', '063')]), ['B25105_001E'])

column_names = ['Median Housing Cost (In Thousands)']
data.columns = column_names

data2 = censusdata.download('acs1', 2019, censusdata.censusgeo([('state', '16'), ('county', '055')]), ['B25105_001E'])

column_names = ['Median Housing Cost (In Thousands)']
data2.columns = column_names

df = pd.concat([data, data2], ignore_index = True, axis = 0)

indexes = ['Spokane County, WA', 'Kootenai County, ID']
df.index = indexes

df['Year'] = '2019'

print(tabulate(df, headers='keys', tablefmt='psql'))

json = df.to_json()
print(json)