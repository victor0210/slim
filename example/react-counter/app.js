import React from 'react'
import ReactDOM from 'react-dom'
import AppComponent from './AppComponent'
import {RSlimProvider} from 'rslim'
import store from './store'

ReactDOM.render(
  <RSlimProvider store={store}>
    <AppComponent/>
  </RSlimProvider>, document.getElementById('app'))
