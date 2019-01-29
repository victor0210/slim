import React, { Component } from 'react';
import './App.css';

class AppComponent extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="btn">-</div>
          <div id="count">Clicked: <span className="tag">{ 1 }</span> times, count is <span className="tag">{ 'Even' }</span>.</div>
          <div className="btn">+</div>
        </header>
      </div>
    );
  }
}

export default AppComponent;
