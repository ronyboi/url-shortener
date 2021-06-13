from flask import Flask, config, request
from flask_mongoengine import MongoEngine
import time
import json
import uuid

with open("config.json") as f:
    data = json.load(f)

app = Flask(__name__)

app.config['MONGODB_HOST'] = "mongodb+srv://rohan:"+data["db_password"] + \
    "@cluster0.ulyke.mongodb.net/url-shortener?retryWrites=true&w=majority"

db = MongoEngine(app)


class Url(db.Document):
    longUrl: str = db.StringField(required=True)
    shortUrl: str = db.StringField(required=True)
    date_created = db.StringField(default=time.ctime(time.time()))

    def to_json(self):
        return {"longUrl": self.longUrl,
                "shortUrl": self.shortUrl,
                "date_created": self.date_created}


@app.get('/api/time')
def get_time():
    return {"time": time.time()}


@app.put('/api/')
def create_url():
    record = json.loads(request.data)
    print(record)
    url = Url(longUrl=record['longUrl'],
              shortUrl=(str(uuid.uuid1())).split("-")[0])
    url.save()
    return (url.to_json())


@app.get('/api/getAll')
def get_allUrls():
    urls = Url.objects()
    if not urls:
        return({'error': 'data not found'})
    else:
        urlDict = []
        i = 0
        for url in urls:
            urlDict.append(url.to_json())
            i += 1
        return json.dumps(urlDict)


@app.delete('/api/delete/<shortUrl>')
def delete_url(shortUrl):
    url = Url.objects(shortUrl=shortUrl).first()
    if not url:
        return ({'error': 'data not found'})
    else:
        url.delete()
    return (url.to_json())


@app.get('/api/<shortUrl>')
def get_url(shortUrl):
    url = Url.objects(shortUrl=shortUrl).first()
    if not url:
        return({'error': 'data not found'})
    else:
        return (url.to_json())
