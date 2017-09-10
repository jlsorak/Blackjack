import React, { Component } from 'react';
import Game from './Game.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Game/>
      </div>
    )
  }
}

export default App;
