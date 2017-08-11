import React, { Component } from 'react';

class Header extends Component {

  showHideBetAmount() {
    if (this.props.betAmount > 0) {
      return <h4>Bet amount: £{this.props.betAmount}</h4>
    }
  }

  displayWinnings() {
    if (this.props.gameOver) {
      return (<h4></h4>)
    }
  }

  render() {
      return (
        <div className="appHeader">
        <table>
        <tbody>
        <tr>
        <td className="firstCol">
          {this.displayWinnings()}
        </td>
        <td className="secondCol">
          <img src='/cards/ace_of_spades.svg' className="appLogo" alt="logo" />
          <h1>Blackjack</h1>
        </td>
        <td className="thirdCol">
          <h2>Bank: £{this.props.bank}</h2>
          {this.showHideBetAmount()}
        </td>
        </tr>
        </tbody>
        </table>
        </div>
      )
  }
}

export default Header;
