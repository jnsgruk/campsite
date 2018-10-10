/* eslint-disable no-undef */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Marker, InfoWindow } from "react-google-maps"
import { Typography } from "@material-ui/core"

class CustomMarker extends Component {
  render = () => {
    const { device, devices, add, remove } = this.props
    const { hover } = devices
    return (
      <Marker
        icon={
          "https://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png"
        }
        position={{ lat: device.lat, lng: device.lon }}
        onMouseOver={() => add(device.callsign)}
        onMouseOut={() => remove(device.callsign)}
      >
        {hover.includes(device.callsign) && (
          <InfoWindow>
            <Typography variant="body2">{device.callsign}</Typography>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

const mapState = ({ devices }) => ({ devices })
const mapDispatch = ({ devices }) => ({
  add: devices.addHover,
  remove: devices.removeHover,
})
export default connect(
  mapState,
  mapDispatch
)(CustomMarker)
