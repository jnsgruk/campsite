### Campsite

Campsite is a device tracking tool. There is a simple [client](https://github.com/jnsgruk/campsite-client) written in NodeJS, but is equally easy to integrate into existing projects through its REST API, described below.

#### Running the project

```bash
git clone git@k.jon0.co.uk:jon/campsite.git
cd campsite/
cd backend/
npm run dev # this will run the project in nodemon

# Open a new tab

cd frontend
npm start
```

Now browse to [http://localhost:3000](http://localhost:3000)

#### API

##### GET /devices

Simple GET endpoint thar returns a list of devices. Example:

```json
[
  {
    "callsign": "Device 1",
    "lat": 52.1764,
    "lon": -0.2345,
    "timestamp": 1536070108
  }
]
```

##### POST /device

POST endpoint for populating a new device in the tracker. Messages with the same callsign will update items already known about. Body of request should contain a JSON object describing the device's location, time and callsign. The end point returns a JSON array of all known devices (this may change!):

```json
{
  "callsign": "Device 1",
  "lat": 52.1764,
  "lon": -0.2345,
  "timestamp": 1536070108
}
```

#### Examples

A couple of examples of how to submit to Campsite from NodeJS and Python:

```javascript
import request from "request-promise-native"
request
  .post({
    uri: "http://localhost:5000/device",
    body: {
      callsign: "Device 1",
      lat: 52.3456,
      lon: -0.2134,
      timestamp: 1536070108,
    },
    json: true,
  })
  .then(body => {
    console.log(body)
  })
```
