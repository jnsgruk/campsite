import { Listener } from "node-gpsd"

class GPS {
  constructor(fakeOut = false) {
    this.fakeOut = fakeOut
    this.tpv = {
      mode: "n/a",
      lat: "n/a",
      lon: "n/a",
      device: "n/a",
    }
    this.device = {
      activated: 0,
      path: "",
    }

    this.listener = new Listener()

    this.listener.on("TPV", t => (this.tpv = { ...this.tpv, ...t }))
    this.listener.on("DEVICE", d => (this.device = { ...this.device, ...d }))
    this.listener.connect(() => this.listener.watch())
  }

  init = io => {
    io.of("/gps").on("connection", socket => {
      this.emitter(socket)
    })
  }

  emitter = socket => {
    socket.broadcast.emit("state", { gps: this.info() })
    setTimeout(() => this.emitter(socket), 1000)
  }

  info = () => {
    if (this.fakeOut) {
      return {
        lat: 51.506463,
        lon: -0.134608,
        mode: "3",
        activated: 333333333,
        device: "/dev/fakeGPS",
      }
    }
    return { ...this.tpv, ...this.device }
  }
}

export default GPS
