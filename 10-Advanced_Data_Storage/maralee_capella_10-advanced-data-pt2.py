import numpy as np
import pandas as pd
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

engine = create_engine("sqlite:///Resources/hawaii.sqlite?check_same_thread=False")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Base.classes.keys()

# Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station


# Create our session (link) from Python to the DB
session = Session(engine)


from flask import Flask, jsonify

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


@app.route("/")
def home():
    """List all available api routes."""
    return (
        "Welcome to My Home Page<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/&ltstart&gt<br/>"
        f"/api/v1.0/&ltstart&gt&ltend&gt"
    )



@app.route("/api/v1.0/precipitation")
def precipiation():
    precip_query= session.query(Measurement.date, Measurement.prcp).all()
   
    all_data = []
    for date,prcp in precip_query:
        dictionary = {}
        dictionary[date] = prcp
        all_data.append(dictionary)
   
    return jsonify(all_data)


@app.route("/api/v1.0/stations")
def stations():
  station_query = session.query(Station.station).all()
   
        
  return jsonify(station_query)

@app.route("/api/v1.0/tobs")
def tobs():
  most_recent = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
  year_before = dt.datetime.date(dt.datetime.strptime(most_recent.date, "%Y-%m-%d")) - dt.timedelta(days=365)
  tobs = [Measurement.date, Measurement.tobs]
  tobs_data = session.query(*tobs).filter(Measurement.date >= year_before).all()
  return jsonify(tobs_data)


@app.route("/api/v1.0/<start>")
def start_date(start):
  temp_info = [
  func.min(Measurement.tobs),
  func.avg(Measurement.tobs),
  func.max(Measurement.tobs)]
  date_1= session.query(*temp_info).\
  filter(Measurement.date > start).\
  order_by(Measurement.date).all()
  return jsonify(date_1)
  
@app.route("/api/v1.0/<start>/<end>")
def two_dates(start,end):
  temp_info2 = [
  func.min(Measurement.tobs),
  func.avg(Measurement.tobs),
  func.max(Measurement.tobs)]
  date_2= session.query(*temp_info2).filter(Measurement.date >= start, Measurement.date <= end).order_by(Measurement.date).all()
  return jsonify(date_2)
  
if __name__ == "__main__":
    app.run(debug=True)

