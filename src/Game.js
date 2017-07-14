import React, { Component } from 'react';
import PlaceBet from './PlaceBet.js';
import Deck from './Deck.js';

const blackjack = require('engine-blackjack')
const actions = blackjack.actions
const GameEngine = blackjack.Game

const game = new GameEngine()

class Game extends Component {
  constructor () {
    super()
    this.startGame = this.startGame.bind(this)
    this.placeBet = this.placeBet.bind(this)
    this.getPlayerCards = this.getPlayerCards.bind(this)
    this.state = {
      gameStarted: false,
      betAmount: 0, 
      playerCards: [],
      dealerCards: []
    }
    console.dir(game.getState())
  }

  startGame() {
    this.setState((prevState, props) => {
      return {
        gameStarted: true
      }
    })
  }

  getPlayerCards(amount) {
    this.setState((prevState, props) => {
      return {
        dealerCards: [
          {number: 5, suit: 'hearts'},
          {number: 3, suit: 'clubs'},
          {number: 7, suit: 'hearts'}
        ]
      }
    })
  }

  placeBet(betAmount) {
    this.setState((prevState, props) => {
      return {
        betAmount
      }
    })
  }

  render() {

    if(this.state.betAmount > 0) {
      return (
        <div>
        <button onClick={this.getPlayerCards}>Get player cards</button>
        <Deck cards={this.state.playerCards} />
        <Deck cards={this.state.dealerCards} />
        </div>
      )
    }

    if(this.state.gameStarted) {
      return (
        <div>
          <PlaceBet placeBet={this.placeBet} />

          <p>You betted: {this.state.betAmount}</p>
        </div>
      )
    }
    return (
      <div>
        <p id="appIntro">
          Click 'play' to get started.
        </p>
        <button id="startButton" onClick={this.startGame}>
          Play
        </button>
      </div>
    )
  }
}


export default Game;
