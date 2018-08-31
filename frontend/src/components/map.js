/* eslint-disable no-undef */
import React, { Component } from "react"
import { compose } from "recompose"
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps"

import CustomMarker from "./map/custom-marker"

class Map extends Component {
  render = () => {
    const { lat, lon, markers } = this.props

    return (
      <GoogleMap defaultZoom={9} defaultCenter={{ lat: lat, lng: lon }}>
        <Marker position={{ lat: lat, lng: lon }} />
        {markers
          ? markers.map((d, i) => (
              <CustomMarker device={d} key={`device-marker-${i}`} />
            ))
          : null}
      </GoogleMap>
    )
  }
}

export default compose(
  withScriptjs,
  withGoogleMap
)(Map)
