import React, { Component } from 'react';
import Game from './Game.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="appHeader">
            <img src='/cards/ace_of_spades.svg' className="appLogo" alt="logo" />
          <h1>Blackjack</h1>
        </div>
        <Game/>
      </div>
    )
  }
}

export default App;
