import React, { Component } from 'react';

const Card = (props) => (
  <img src={`cards/${props.number}_of_${props.suit}.svg`} />
)

class Deck extends Component {

  render() {
    return (
      <div>
      {this.props.cards.map(card => {
        return <Card number={card.number} suit={card.suit} />
      })}
      </div>
    )
  }
}

export default Deck;
