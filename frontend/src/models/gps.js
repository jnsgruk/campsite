import io from "socket.io-client"
import { ENDPOINT, c_axios as axios } from "../components/helpers"
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
      const res = await axios.get(`${ENDPOINT}/api/gps`)
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
