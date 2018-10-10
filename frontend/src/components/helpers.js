import https from "https"
import axios from "axios"

const c_axios = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? `http://${window.location.hostname}:5000`
    : `https://${window.location.hostname}`

export { ENDPOINT, c_axios }
