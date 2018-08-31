import React from "react"
import { connect } from "react-redux"
import Moment from "react-moment"

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Typography,
} from "@material-ui/core"

const Device = ({ device, devices, add, remove }) => (
  <ListItem
    onMouseEnter={() => add(device.callsign)}
    onMouseLeave={() => remove(device.callsign)}
    style={{
      backgroundColor: devices.hover.includes(device.callsign)
        ? "#ddd"
        : "#fff",
    }}
  >
    <ListItemIcon>
      <Icon>gps_fixed</Icon>
    </ListItemIcon>
    <ListItemText>
      <Typography variant="body1">{device.callsign}</Typography>
      <Typography variant="caption">{`${device.lat}, ${
        device.lon
      }`}</Typography>
      <Typography variant="caption">
        <Moment unix fromNow>
          {device.timestamp}
        </Moment>
      </Typography>
    </ListItemText>
  </ListItem>
)

const mapState = ({ devices }) => ({ devices })

const mapDispatch = ({ devices }) => ({
  add: devices.addHover,
  remove: devices.removeHover,
})

export default connect(
  mapState,
  mapDispatch
)(Device)
