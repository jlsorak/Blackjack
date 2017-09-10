import React, { Component } from 'react';
import { Button, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class PlaceBet extends Component {

  constructor() {
    super()
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.resetCounter = this.resetCounter.bind(this)
    this.placeBet = this.placeBet.bind(this)
    this.startingBankBalance = this.startingBankBalance.bind(this)
    this.state = {
      count: 0,
      bankAmount: 10
    }
  }


  add(noToAdd) {
    if (this.state.count + noToAdd > this.state.bankAmount ) {
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
    this.props.placeBet(this.state.count, this.state.bankAmount)
  }

  handleRadioSelect(values) {
    console.log(values)
    this.setState({ bankAmount: values })
  }

  startingBankBalance() {
    if (this.props.bank === null) {
      return (
        <div className="startingBankBalance">
          <h4>Select your starting bank balance:</h4>
          <ToggleButtonGroup type="radio" defaultValue={this.state.bankAmount} onChange={this.handleRadioSelect} name="options">
            <ToggleButton className="bankBalanceRadio" value={10}>
              £10
            </ToggleButton>
            <ToggleButton className="bankBalanceRadio" value={50}>
              £50
            </ToggleButton>
            <ToggleButton className="bankBalanceRadio" value={100}>
              £100
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="menuContainer">
        {this.startingBankBalance()}
        <h4>Place your bets:</h4>
        <Button className="betModifier" onClick={() => this.remove(1)}>-</Button>
        <p id="betAmount">{this.state.count}</p>
        <Button className="betModifier" onClick={() => this.add(1)}>+</Button>
        <div className="placeBet">
          <p id="quickAddLabel">Quick add:</p>
          <Button className="quickBetModifier" onClick={() => this.add(2)}>+2</Button>
          <Button className="quickBetModifier" onClick={() => this.add(5)}>+5</Button>
          <Button className="quickBetModifier" onClick={() => this.add(10)}>+10</Button>
          <Button className="quickBetModifier" id="resetBet" onClick={this.resetCounter}>Reset</Button>
        </div>
        <Button className="betButton" id="placeBet" onClick={this.placeBet}>Place Bet</Button>
      </div>
    )
  }
}

export default PlaceBet;
