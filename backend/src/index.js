import express from "express"
import { Server } from "http"
import SocketIO from "socket.io"
import compression from "compression"
import bodyParser from "body-parser"

import GPS from "./gps"

let app = express()
app.use(compression({}))
app.use(bodyParser.json())
let server = Server(app)
let io = new SocketIO(server)

let devices = []
// Each device { callsign: "B20", lat: 52.563, lon: -0.13332, timestamp: 22342322 }

server.listen(5000)

const gps = new GPS(true)
gps.init(io)

const emitter = socket => {
  socket.broadcast.emit("state", { devices })
  setTimeout(() => emitter(socket), 1000)
}

io.of("/devices").on("connection", socket => {
  emitter(socket)
})

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

app.post("/api/device", (req, res) => {
  let device = req.body
  const index = devices.findIndex(d => d.callsign === device.callsign)
  if (index > -1) {
    devices[index].lat = device.lat
    devices[index].lon = device.lon
    devices[index].timestamp = device.timestamp
  } else {
    devices.push(device)
  }
  res.send(devices)
})

app.get("/api/devices", (req, res) => {
  res.send(JSON.stringify(devices))
})

app.get("/api/gps", (req, res) => {
  res.send(JSON.stringify(gps.info()))
})
