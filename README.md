### Campsite

Campsite is a device tracking tool. There is a simple [client](https://github.com/jnsgruk/campsite-client) written in NodeJS, but is equally easy to integrate into existing projects through its REST API, described below.

### Installing in production with systemd unit

This method will install Campsite into `/opt/campsite` and create a systemd unit called `campsite`. It will also install an nginx config to server up the frontend.

NOTE: The install script will overwrite `/etc/nginx/sites-enabled/default`!

First, obtain a release zip file. This can be downloaded from the [Releases Page](https://github.com/jnsgruk/campsite/releases) or built from the command line:

```
$ git clone https://github.com/jnsgruk/campsite
$ cd campsite/
$ ./build-release.sh
```

Once you have a release zip, copy it onto the server device and run:

````
$ unzip campsite.zip && sudo ./campsite/install.sh


#### Running the project (Development Mode)

```bash
git clone git@github.com:jnsgruk/campsite.git
cd campsite/
cd backend/
yarn # install deps
yarn run dev # this will run the project in nodemon

# Open a new tab

cd frontend
yarn # install deps
yarn start
````

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
