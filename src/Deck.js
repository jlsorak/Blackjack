import React, { Component } from 'react';

const cardClasses = `cards slide-in-right`
const Card = (props) => (
  <img className={cardClasses} src={`cards/${props.number}_of_${props.suit}.svg`} />
)

class Deck extends Component {

  render() {
    return (
      <div>
      {this.props.cards.map(card => {
        switch(card.number){
          case "K":
            card.number = "king"
            break
          case "Q":
            card.number = "queen"
            break
          case "J":
            card.number = "jack"
            break
          case "A":
            card.number = "ace"
            break
        }
        return <Card key={card.number + card.suit} number={card.number} suit={card.suit} />
      })}
      </div>
    )
  }
}

export default Deck;
