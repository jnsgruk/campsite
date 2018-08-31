import io from "socket.io-client"
import axios from "axios"
const ENDPOINT = `http://${window.location.hostname}:5000`
const socket = io(`${ENDPOINT}/devices`)

const devices = {
  state: {},

  reducers: {
    update(state, payload) {
      return payload.devices || {}
    },
  },
  effects: {
    async fetchDevices() {
      const res = await axios.get(`${ENDPOINT}/devices`)
      this.update(res.data)
    },
    async init() {
      this.fetchDevices()
      socket.on("state", state => {
        this.update(state)
      })
    },
  },
}
export default devices
