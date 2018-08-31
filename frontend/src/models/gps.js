import io from "socket.io-client"
import axios from "axios"
const ENDPOINT = `http://${window.location.hostname}:5000`
const socket = io(`${ENDPOINT}/gps`)

const GPS = {
  state: {},

  reducers: {
    update(state, payload) {
      return payload.gps || {}
    },
  },
  effects: {
    async fetchGPS() {
      const res = await axios.get(`${ENDPOINT}/gps`)
      this.update(res.data)
    },
    async init() {
      this.fetchGPS()
      socket.on("state", state => {
        this.update(state)
      })
    },
  },
}
export default GPS
