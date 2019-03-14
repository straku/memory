import React, { Component } from 'react';

import shuffle from 'lodash/shuffle';

// prettier-ignore
const faces = [
  '🐶', '🐱', '🐭', '🐹',
  '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮',
  '🐷', '🐸', '🐵', '🐔',
  '🦑', '🦖'
];

function Card(props) {
  const { state, card, onClick } = props;
  const className = state === 'face-up' || state === 'done' ? 'flipped' : '';
  return (
    <div
      className={`card ${className}`}
      onClick={state === 'done' ? null : () => onClick(card)}
    >
      <div className="face">♦️</div>
      <div className="face">{card.face}</div>
    </div>
  );
}

function getCards(length) {
  const possibleFaces = faces.slice(0, length / 2);
  const allCards = shuffle([...possibleFaces, ...possibleFaces]);
  return allCards.map((face, i) => ({
    id: i,
    face: face,
  }));
}

class App extends Component {
  constructor(props) {
    super(props);
    const cards = getCards(16);
    this.state = {
      cards: cards,
      cardsState: Array(16).fill('face-down'),
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(card) {
    const { cards, cardsState } = this.state;
    const newCardsState = cardsState.slice();
    const faceUpCardId = newCardsState.findIndex(card => card === 'face-up');

    if (cards[faceUpCardId] && cards[faceUpCardId].face === card.face) {
      newCardsState[faceUpCardId] = 'done';
      newCardsState[card.id] = 'done';
      this.setState({ cardsState: newCardsState });
    } else if (cards[faceUpCardId] && cards[faceUpCardId].face !== card.face) {
      newCardsState[faceUpCardId] = 'face-up';
      newCardsState[card.id] = 'face-up';
      this.setState({ cardsState: newCardsState });
      setTimeout(() => {
        newCardsState[faceUpCardId] = 'face-down';
        newCardsState[card.id] = 'face-down';
        this.setState({ cardsState: newCardsState });
      }, 500);
    } else {
      newCardsState[card.id] = 'face-up';
      this.setState({ cardsState: newCardsState });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="board">
          {this.state.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              state={this.state.cardsState[card.id]}
              onClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
