import React, { Component } from "react"
import { connect } from "react-redux"

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Typography,
} from "@material-ui/core"

class Overview extends Component {
  componentWillMount = () => {
    this.props.initDevices()
    this.props.initGPS()
  }

  render = () =>
    Object.keys(this.props.devices).length ? (
      <div>
        <Typography variant="body2" style={{ padding: 10 }}>
          Devices
        </Typography>
        <List dense>
          {this.props.devices.devices.map((device, i) => (
            <Device
              key={`device-list-${i}`}
              device={device}
              add={this.props.add}
              remove={this.props.remove}
              hover={this.props.devices.hover}
            />
          ))}
        </List>
      </div>
    ) : null
}

const Device = ({ device, add, remove, hover }) => (
  <ListItem
    onMouseEnter={() => add(device.callsign)}
    onMouseLeave={() => remove(device.callsign)}
    style={{
      backgroundColor: hover.includes(device.callsign) ? "#ddd" : "#fff",
    }}
  >
    <ListItemIcon>
      <Icon>gps_fixed</Icon>
    </ListItemIcon>
    <ListItemText
      primary={device.callsign}
      secondary={`${device.lat}, ${device.lon}`}
    />
  </ListItem>
)

const mapState = ({ devices, gps }) => ({ devices, gps })

const mapDispatch = ({ devices, gps }) => ({
  initDevices: devices.init,
  initGPS: gps.init,
  add: devices.addHover,
  remove: devices.removeHover,
})

export default connect(
  mapState,
  mapDispatch
)(Overview)
