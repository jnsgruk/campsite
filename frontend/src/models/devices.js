import io from "socket.io-client"
import { ENDPOINT, c_axios as axios } from "../components/helpers"
const socket = io(`${ENDPOINT}/devices`)

const devices = {
  state: {
    hover: [],
    devices: [],
  },

  reducers: {
    update(state, payload) {
      return { ...state, devices: payload }
    },
    addHover(state, callsign) {
      if (state.hover.includes(callsign)) {
        return state
      }
      let hover = state.hover
      hover.push(callsign)
      return { ...state, hover }
    },
    removeHover(state, callsign) {
      if (!state.hover.includes(callsign)) {
        return state
      }
      let hover = state.hover.filter(d => d !== callsign)
      return { ...state, hover }
    },
  },
  effects: {
    async fetchDevices() {
      const res = await axios.get(`${ENDPOINT}/api/devices`)
      this.update(res.data)
    },
    async init() {
      this.fetchDevices()
      socket.on("state", state => {
        this.update(state.devices)
      })
    },
  },
}
export default devices
