import React, { Component } from 'react';
import './App.css';
import {RSlimConsumer} from 'rslim'

class AppComponent extends Component {
  render() {
    return (
      <RSlimConsumer>
        {({$store, $state}) => (
          <div id="app">
            <div className="btn" onClick={() => {$store.dispatch('decrement')}}>-</div>
            <div id="count">
              Clicked:
              <span className="tag">{ $state.count }</span>
              times, count is
              <span className="tag">{ $state.count % 2 === 0 ? 'Even': 'Odd' }</span>
              .
            </div>
            <div className="btn" onClick={() => {$store.dispatch('increment')}}>+</div>
          </div>
        )}
      </RSlimConsumer>
    );
  }
}

export default AppComponent;