import React, { Component } from 'react';
import './App.css';
import {RSlimConsumer} from 'rslim'

class AppComponent extends Component {
  render() {
    return (
      <RSlimConsumer>
        {({$store, $state, $cpt}) => (
          <div id="app">
            <div className="btn" onClick={() => {$store.commit('decrement')}}>-</div>
            <div id="count">
              Clicked:
              <span className="tag">{ $state.count }</span>
              times, count is
              <span className="tag">{ $cpt.evenOrOdd }</span>
              .
            </div>
            <div className="btn" onClick={() => {$store.commit('increment')}}>+</div>
          </div>
        )}
      </RSlimConsumer>
    );
  }
}

export default AppComponent;
