import React, { Component } from "react"
import { connect } from "react-redux"

import { List, Typography } from "@material-ui/core"

import Device from "./list/device"

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
            <Device key={`device-list-${i}`} device={device} />
          ))}
        </List>
      </div>
    ) : null
}

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
