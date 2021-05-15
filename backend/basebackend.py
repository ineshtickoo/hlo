import os
import pymongo
import json
import time

def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()
    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    
    db = client["tmob5ghackathon"]


    col = db.readings

    maxid = 1

    for x in col.find():
        maxid = maxid+1

    if "update" in request_json:

        t = int(time.time())

        ts = str(t)
        payload = {}
        payload['id'] = str(maxid)
        payload['userid'] = 1
        payload['ts'] = ts
        payload['pulse'] = request_json['pulse']
        payload['temp'] = request_json['tmp']
        payload['spo2'] = request_json['spo2']
        payload['gsrRaw'] = request_json['gsrraw']
        payload['gsrDev'] = request_json['gsrdev']
        payload['lat'] = request_json['lat']
        payload['lon'] = request_json['lon']
        

        col.insert_one(payload)


        retjson = {}

        retjson['mongoresult'] = str(maxid)

        return json.dumps(retjson)


    if "updatelocation" in request_json:

        col = db.locations

        maxid = 1

        for x in col.find():
            maxid = maxid+1

        t = int(time.time())

        ts = str(t)
        payload = {}
        payload['id'] = str(maxid)
        payload['hvac'] = request_json['hvac']
        payload['led'] = request_json['led']
        payload['dooropen'] = request_json['dooropen']
        payload['lat'] = request_json['lat']
        payload['lon'] = request_json['lon']
        

        col.insert_one(payload)


        retjson = {}

        retjson['mongoresult'] = str(maxid)

        return json.dumps(retjson)


    if "locations" in request_json:
        col = db.locations
        rooms = []

        for x in col.find():
            room = {}
            room['lat'] = x ['lat']
            room['lon'] = x['lon']
            room['hvac'] = x['hvac']
            room['led'] = x['led']
            room['doorOpen'] = x['dooropen']


            rooms.append(room)

        
        retjson = {}

        retjson['locations'] = rooms

        return json.dumps(retjson)


    times = []
    pulses = []
    spo2s = []
    temps = []
    gsr1 = []
    gsr2 = []
    lats = []
    lons = []
    maxid = 0
    pulse = 0
    spo2 = 0
    temp = 0.0
    tms = 0
    for x in col.find().sort("id", -1).limit(50):

        tms +=1

        pulse = {}
        pulse['time'] = tms
        pulse['pulse'] = int(x['pulse'])

        oxygen = {}
        oxygen['time'] = tms
        oxygen['oxygen'] = float(x['spo2'])
        
        tm = {}
        tm['time'] = tms
        tm['temperature'] = float(x['temp'])
        

        pulses.append(pulse)
        spo2s.append(oxygen)
        temps.append(tm)
        
        gsr1.append(x['gsrRaw'])
        gsr2.append(x['gsrDev'])
        lats.append(x['lat'])
        lons.append(x['lon'])
        times.append(x['ts'])




        
        maxid +=1

        pulse = x['pulse']
        spo2 = x['spo2']
        temp = x['temp']




        

    
    
    retjson = {}

    retjson['pulse'] = pulses
    retjson['oxygen'] = spo2s
    retjson['temperature'] = temps
    retjson['gsrRaw'] = gsr1
    retjson['gsrDev'] = gsr2
    retjson['times'] = times
    retjson['lats'] = lats
    retjson['lons'] = lons

    
    retjson['mongoresult'] = str(maxid)

    return json.dumps(retjson)


    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
