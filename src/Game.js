import React, { Component } from 'react';
import PlaceBet from './PlaceBet.js';
import Deck from './Deck.js';
import Header from './Header.js';

const blackjack = require('engine-blackjack')
const actions = blackjack.actions
const GameEngine = blackjack.Game

class Game extends Component {
  constructor () {
    super()
    this.state = {
      gameStarted: false,
      betAmount: 0,
      playerCards: [],
      dealerCards: [],
      gameOver : false,
      feedbackMessage: "",
      game: new GameEngine(),
      bank: 50
    }
    console.log(this.state.game.getState().stage)
    this.startGame = this.startGame.bind(this)
    this.placeBet = this.placeBet.bind(this)
    this.getInitialCards = this.getInitialCards.bind(this)
    this.playerHit = this.playerHit.bind(this)
    this.dealerHit = this.dealerHit.bind(this)
    this.getDealerValue = this.getDealerValue.bind(this)
    this.getPlayerValue = this.getPlayerValue.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  componentDidMount() {
    //this.getInitialCards()
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
        betAmount: betAmount,
        bank: prevState.bank - betAmount
      }
    })
  }

  getInitialCards(amount) {
    this.state.game.dispatch(actions.deal({bet: this.state.betAmount}))
    console.log(this.state.game.getState())
    this.setState((prevState, props) => {
      return {
        dealerCards: [
          {number: this.state.game.getState().dealerCards[0].text, suit: this.state.game.getState().dealerCards[0].suite},
          {number: "reverse", suit: "card"}
        ],
        playerCards: [
          {number: this.state.game.getState().handInfo.right.cards[0].text, suit: this.state.game.getState().handInfo.right.cards[0].suite},
          {number: this.state.game.getState().handInfo.right.cards[1].text, suit: this.state.game.getState().handInfo.right.cards[1].suite}
        ]
      }
    })
  }

  playerHit() {
    this.state.game.dispatch(actions.hit('right'))

    const cards = this.state.game.getState().handInfo.right.cards;
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
    this.state.game.dispatch(actions.stand('right'))
    console.log(this.state.game.getState())

    const removeOne = this.state.dealerCards.slice()
    removeOne.splice(1, 1)
    this.state.dealerCards = removeOne

    // this.setState((prevState, props) => {
    //   return {
    //
    //     dealerCards: [
    //       {number: this.state.game.getState().dealerCards[0].text, suit: this.state.game.getState().dealerCards[0].suite},
    //       {number: this.state.game.getState().dealerCards[1].text, suit: this.state.game.getState().dealerCards[1].suite}
    //     ]
    //   }
    // })

    const cards = this.state.game.getState().dealerCards
    const dealerCards = cards.map(card => {
      return {
        number: card.text,
        suit: card.suite
      }
    })
    this.setState((prevState,props) => {
      return {
        dealerCards
      }
    })
    this.checkGameStatus()
  }

  checkGameStatus() {
    const playerCheck = this.state.game.getState().handInfo.right;
    if (playerCheck.playerHasBlackjack) {
      console.log('player has blackjack')
      //alert('You got blackjack!')
      this.setState({gameOver: true})
      this.calculateWinnings()
      return this.setState({feedbackMessage: 'You have got blackjack'})
    } else if (playerCheck.playerHasBusted) {
      console.log('Bust!')
      this.setState({gameOver: true})
      this.calculateWinnings()
      return this.setState({feedbackMessage: 'You have bust'})
    } else if (this.state.game.getState().wonOnRight > 0) {
      console.log('You won')
      this.setState({gameOver: true})
      this.calculateWinnings()
      return this.setState({feedbackMessage: 'You won'})
    }

    const dealerCheck = this.state.game.getState();
    if (dealerCheck.hasBlackjack) {
      console.log('dealer has blackjack')
      //alert('Dealer has blackjack')
      this.setState({gameOver: true})
      this.calculateWinnings()
      return this.setState({feedbackMessage: 'Dealer has blackjack'})
    } else if (dealerCheck.dealerHasBusted) {
      console.log('dealer bust!')
      //alert('Dealer has bust! You win :)')
      this.setState({gameOver: true})
      this.calculateWinnings()
      return this.setState({feedbackMessage: 'Dealer has bust, you win'})
    } else if (dealerCheck.stage === "done" && dealerCheck.wonOnRight === 0) {
      this.setState({gameOver: true})
      this.calculateWinnings()
      return this.setState({feedbackMessage: 'Dealer wins'})
    }
  }

  //const cards = this.state.game.getState()
  // this.setState((prevState,props) => {
  //   return {
  //     dealerCards: state.concat([
  //       {number: cards.dealerHoleCard.text, suit: cards.dealerHoleCard.suite}
  //     ])
  //     }
  //   })
  //   console.log(this.state.game.getState())

  getDealerValue() {
    const dealerValue = this.state.game.getState().dealerValue

    if(dealerValue.hi === dealerValue.lo) {
      return dealerValue.hi
    } else {
      return dealerValue.hi + "/" + dealerValue.lo
    }
  }

  getPlayerValue() {
    const playerValue = this.state.game.getState().handInfo.right.playerValue

    if(playerValue.hi === playerValue.lo) {
      return playerValue.hi
    } else {
      return playerValue.hi + "/" + playerValue.lo
    }
  }

  calculateWinnings() {
    const gameState = this.state.game.getState()

    if(gameState.wonOnRight > 0) {
      this.setState((prevState, props) => {
        return {
          bank: prevState.bank + gameState.wonOnRight,
          betAmount: 0
        }
      })
    }
    return this.setState(
      {
        betAmount: 0
      })
  }

  resetGame() {

    return this.setState({
      gameStarted: true,
      gameOver : false,
      feedbackMessage: "",
      game: new GameEngine(),
      playerCards: [],
      dealerCards: []
    }, this.getInitialCards())
  }

  render() {
    if(this.state.gameOver) {
      return (
        <div>
          <Header bank={this.state.bank} betAmount={this.state.betAmount}/>
          <table id="cardTable">
            <tbody>
              <tr>
                <div id="dealer">
                  <td className="firstCol"><h3 id="dealerText">Dealer</h3><h1 id="dealerValue">{this.getDealerValue()}</h1></td>
                  <td className="secondCol"><Deck cards={this.state.dealerCards} flipHoleCard={this.state.flipHoleCard}/></td>
                  <td className="thirdCol"> </td>
                </div>
              </tr>

              <tr>
                <div id="player">
                  <td className="firstCol">
                    <h2>{this.state.feedbackMessage}</h2>
                    <button id="playAgainButton" onClick={this.resetGame}>Play again </button>
                  </td>
                  <td className="secondCol"><Deck cards={this.state.playerCards} /></td>
                  <td className="thirdCol"><h3 id="playerText">Player</h3><h1 id="playerValue">{this.getPlayerValue()}</h1></td>

                </div>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }

    if(this.state.betAmount > 0 && !this.state.gameOver && this.state.dealerCards.length < 1) {
      this.getInitialCards()
    }

    if(this.state.betAmount > 0 && !this.state.gameOver && this.state.dealerCards.length > 0) {
      return (
        <div>
          <Header bank={this.state.bank} betAmount={this.state.betAmount}/>
          <table id="cardTable">
            <tbody>
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
            </tbody>
          </table>
        </div>
      )
    }

    if(this.state.gameStarted) {
      return (
        <div>
          <Header bank={this.state.bank} betAmount={this.state.betAmount}/>
          <PlaceBet placeBet={this.placeBet} />
        </div>
      )
    }
    return (
      <div>
        <Header bank={this.state.bank} betAmount={this.state.betAmount}/>
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
