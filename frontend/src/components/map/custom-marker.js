/* eslint-disable no-undef */
import React, { Component } from "react"
import { Marker, InfoWindow } from "react-google-maps"
import { Typography } from "@material-ui/core"

class CustomMarker extends Component {
  state = { show: false }

  render = () => {
    const { device } = this.props
    return (
      <Marker
        icon={
          "http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png"
        }
        position={{ lat: device.lat, lng: device.lon }}
        onMouseOver={() => this.setState({ show: true })}
        onMouseOut={() => this.setState({ show: false })}
      >
        {this.state.show && (
          <InfoWindow>
            <Typography variant="body2">{device.callsign}</Typography>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default CustomMarker
