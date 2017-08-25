from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)


MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017

DBS_NAME = 'unitedNations'
COLLECTION_NAME = 'refugeesReport'


FIELDS = {'Year': True, '_id': False, 'Country': True, 'Origin': True, 'Refugees': True, 'TotalPopulation': True}


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/unitedNations/refugeesReport")
def refugees_projects():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=130000)

    json_projects = list(projects)

    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects

if __name__ == "__main__":
    app.run(debug=True)

