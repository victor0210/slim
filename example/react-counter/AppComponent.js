import React, { Component } from 'react';
import './App.css';
import {RSlimConsumer} from 'rslim'

class AppComponent extends Component {
  render() {
    return (
      <RSlimConsumer>
        {({$store, $state}) => (
          <div id="app">
            <div className="btn decrement" onClick={() => {$store.commit('decrement')}}>-</div>
            <div id="count">
              Clicked:
              <span className="tag">{ $state.count }</span>
              times, count is
              <span className="tag">{ $state.count % 2 === 0 ? 'Odd': 'Even' }</span>
              .
            </div>
            <div className="btn increment" onClick={() => {$store.commit('increment')}}>+</div>
          </div>
        )}
      </RSlimConsumer>
    );
  }
}

export default AppComponent;
