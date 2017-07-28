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
    this.dealerHit = this.dealerHit.bind(this)
    this.getDealerValue = this.getDealerValue.bind(this)
    this.getPlayerValue = this.getPlayerValue.bind(this)
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

  placeBet(betAmount) {
    this.setState((prevState, props) => {
      return {
        betAmount
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
    this.checkGameStatus()
  }

  playerHit() {
    game.dispatch(actions.hit('right'))

    const cards = game.getState().handInfo.right.cards;
    const playerCards = cards.map(card => {
      return {
        number: card.text,
        suit: card.suite
      }
    })
    this.setState((prevState,props) => {
      return {
        playerCards
      }
    })
    this.checkGameStatus()
  }

  dealerHit() {
    game.dispatch(actions.stand('right'))
    console.log(game.getState())

    const removeOne = this.state.dealerCards.slice()
    removeOne.splice(1, 1)

    this.setState((prevState, props) => {
      return {

        dealerCards: [
          {number: game.getState().dealerCards[0].text, suit: game.getState().dealerCards[0].suite},
          {number: game.getState().dealerCards[1].text, suit: game.getState().dealerCards[1].suite}
        ]
      }
    })

    // const cards = game.getState().dealerCards
    // const dealerCards = cards.map(card => {
    //   return {
    //     number: card.text,
    //     suit: card.suite
    //   }
    // })
    // this.setState((prevState,props) => {
    //   return {
    //     dealerCards
    //   }
    // })
    this.checkGameStatus()
  }

  checkGameStatus() {
    const playerCheck = game.getState().handInfo.right;
    if (playerCheck.playerHasBlackjack) {
      console.log('player has blackjack')
    } else if (playerCheck.playerHasBusted) {
      console.log('bust!')
    }

    const dealerCheck = game.getState();
    if (dealerCheck.hasBlackjack) {
      console.log('dealer has blackjack')
    } else if (dealerCheck.dealerHasBusted) {
      console.log('dealer bust!')
    }
  }

    //const cards = game.getState()
    // this.setState((prevState,props) => {
    //   return {
    //     dealerCards: state.concat([
    //       {number: cards.dealerHoleCard.text, suit: cards.dealerHoleCard.suite}
    //     ])
    //     }
    //   })
    //   console.log(game.getState())

    getDealerValue() {
      const dealerValue = game.getState().dealerValue
      console.log(game.getState().dealerValue.hi)

      if(dealerValue.hi === dealerValue.lo) {
        console.log(dealerValue.hi)
        return dealerValue.hi
      } else {
        console.log(dealerValue.hi)
        return dealerValue.hi + "/" + dealerValue.lo
      }
    }

    getPlayerValue() {
      const playerValue = game.getState().handInfo.right.playerValue

      if(playerValue.hi === playerValue.lo) {
        return playerValue.hi
      } else {
        return playerValue.hi + "/" + playerValue.lo
      }
    }




    render() {
      if(this.state.betAmount > 0) {
        return (
          <div>
          <table id="cardTable">
            <tr>
              <div id="dealer">
                <td className="firstCol"><h3 id="dealerText">Dealer</h3><h1 id="dealerValue">{this.getDealerValue()}</h1></td>
                <td className="secondCol"><Deck cards={this.state.dealerCards} /></td>
                <td className="thirdCol"> </td>
              </div>
            </tr>

            <tr>
              <div id="player">
                <td className="firstCol">
                  <button className="modifierButtons" onClick={this.playerHit}>Hit</button>
                  <button className="modifierButtons" onClick={this.dealerHit}>Stick</button>
                 </td>
                <td className="secondCol"><Deck cards={this.state.playerCards} /></td>
                <td className="thirdCol"><h3 id="playerText">Player</h3><h1 id="playerValue">{this.getPlayerValue()}</h1></td>

              </div>
            </tr>
          </table>
          </div>
        )
      }

      if(this.state.gameStarted) {
        return (
          <div>
          <PlaceBet placeBet={this.placeBet} />
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
