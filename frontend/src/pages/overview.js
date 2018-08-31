import React, { Component } from "react"
import { connect } from "react-redux"
import Map from "../components/map"

class Overview extends Component {
  componentWillMount = () => {
    this.props.initDevices()
    this.props.initGPS()
  }

  render = () =>
    Object.keys(this.props.gps).length ? (
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDLtmMaLICUV7l6OfIl9rW2vdsXXc31s4M&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "calc(100vh - 90px)" }} />}
        lat={this.props.gps.lat}
        lon={this.props.gps.lon}
        markers={
          Object.keys(this.props.devices).length ? this.props.devices : null
        }
      />
    ) : null
}

const mapState = ({ devices, gps }) => ({ devices, gps })

const mapDispatch = ({ devices, gps }) => ({
  initDevices: devices.init,
  initGPS: gps.init,
})

export default connect(
  mapState,
  mapDispatch
)(Overview)
