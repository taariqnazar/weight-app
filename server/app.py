from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import sqlite3
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/', methods=["GET"])
def chart():
    connection = sqlite3.connect("weight.db")
    response = get_all_data(connection)
    
    return jsonify(response)

@app.route('/', methods=['POST'])
def post_data():
    connection = sqlite3.connect("weight.db")
    cursor = connection.cursor()

    date = pd.to_datetime("today") 
    weight = request.args.get("weight") 

    # Check if weight is a number first
    try:
        weight = float(weight)
    except:
        
        return request.status(400)

    cursor.execute(f'INSERT INTO weight VALUES ("{date}", {weight})')
    connection.commit()

    response = get_all_data(connection)
    connection.close()

    return jsonify(response)

@app.route('/clear')
def clear():
    connection = sqlite3.connect("weight.db")
    cursor = connection.cursor()

    cursor.execute('DELETE FROM weight')
    connection.commit()
    connection.close()

    return "Cleared weight table"


def get_all_data(connection):

    data = pd.read_sql("SELECT * FROM weight", connection)
    connection.close()
    if data.shape[0] < 1:
        return {'data':[], 'cards':[]}


    data = process_df(data)

    response = {
            'data':[],
            'cards': [
                {
                    'id': "avg",
                    'value': np.round(data['weight'].rolling(7).mean().iloc[-1], 1) if data.shape[0] > 7 else '-'  ,
                    'description': "7 day rolling average"
                },
                {
                    'id': "min",
                    'value': np.round(data['weight'].min(), 1),
                    'description': "Rolling min"
                },
                {
                    'id': "total",
                    'value': np.round(data['weight'].iloc[-1] - data['weight'].iloc[0], 1),
                    'description': "Total difference since start"
                },
                {
                    'id': "curr",
                    'value': np.round(data['weight'].iloc[-1], 1),
                    'description': "Daily weight"
                },
            ]
    }

    for d in data.T.to_dict().values():
        response['data'].append(d)

    return response

def get_weight_data():
    return "get all weight data"

def process_df(df):
    df['date'] = df['date'].apply(lambda x: pd.to_datetime(x).strftime('%Y-%m-%d'))
    df['cum_w'] = df['weight'].diff()

    df = np.round(df, 1)
    df = df.fillna('')
    return df

if __name__ == "__main__":
    app.run(debug = True, host="0.0.0.0", port=3001)
