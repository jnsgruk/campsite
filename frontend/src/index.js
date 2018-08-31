import "typeface-roboto"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { init } from "@rematch/core"
import * as models from "./models/models"

import Campsite from "./pages/campsite"
import Wrapper from "./components/wrapper"

const store = init({ models })

ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <Campsite />
    </Wrapper>
  </Provider>,
  document.getElementById("root")
)
