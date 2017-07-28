import React, { Component } from 'react';

class PlaceBet extends Component {

  constructor() {
    super()
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.resetCounter = this.resetCounter.bind(this)
    this.placeBet = this.placeBet.bind(this)
    this.state = {
      count: 0
    }
  }


  add(noToAdd) {
    if (this.state.count + noToAdd > 50) {
      this.setState({
        count: 50
      })
    } else {
      this.setState({
        count: this.state.count + noToAdd
      })
    }
  }

  remove(noToRemove) {
    if(this.state.count - noToRemove < 0) {
      this.setState({
        count: 0
      })
    } else {
      this.setState({
        count: this.state.count - noToRemove
      })
    }
  }

  resetCounter() {
    this.setState({
      count: 0
    })
  }

  placeBet() {
    this.props.placeBet(this.state.count)
  }

  render() {
    return (
      <div>
        <p>Place your bets:</p>
        <button className="betModifier" onClick={() => this.remove(1)}>-</button>
        <p id="betAmount">{this.state.count}</p>
        <button className="betModifier" onClick={() => this.add(1)}>+</button>
        <div className="placeBet">
          <p id="quickAddLabel">Quick add:</p>
          <button className="quickBetModifier" onClick={() => this.add(2)}>+2</button>
          <button className="quickBetModifier" onClick={() => this.add(5)}>+5</button>
          <button className="quickBetModifier" onClick={() => this.add(10)}>+10</button>
          <button className="quickBetModifier" id="resetBet" onClick={this.resetCounter}>Reset</button>
        </div>
        <button className="betButton" id="placeBet" onClick={this.placeBet}>Place Bet</button>
      </div>
    )
  }
}

export default PlaceBet;
