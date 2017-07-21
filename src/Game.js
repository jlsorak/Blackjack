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
    console.log(game.getState().stage)
    this.startGame = this.startGame.bind(this)
    this.placeBet = this.placeBet.bind(this)
    this.getInitialCards = this.getInitialCards.bind(this)
    this.playerHit = this.playerHit.bind(this)
    this.state = {
      gameStarted: false,
      betAmount: 0,
      playerCards: [],
      dealerCards: []
    }
  }

  componentDidMount() {
    this.getInitialCards();
  }


  startGame() {
    this.setState((prevState, props) => {
      return {
        gameStarted: true
      }
    })
  }

  getInitialCards(amount) {
    game.dispatch(actions.deal())
    console.log(game.getState())

    this.setState((prevState, props) => {
      return {
        dealerCards: [
          {number: game.getState().dealerCards[0].text, suit: game.getState().dealerCards[0].suite},
          {number: "reverse", suit: "card"}
        ],
        playerCards: [
          {number: game.getState().handInfo.right.cards[0].text, suit: game.getState().handInfo.right.cards[0].suite},
          {number: game.getState().handInfo.right.cards[1].text, suit: game.getState().handInfo.right.cards[1].suite}
        ]
      }
    })

    return (
      <div>
      <button className="modifierButtons">Hit</button>
      <button className="modifierButtons">Stick</button>
      </div>
    )
  }

  playerHit() {
    
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
        <Deck cards={this.state.dealerCards} />
        <Deck cards={this.state.playerCards} />
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
