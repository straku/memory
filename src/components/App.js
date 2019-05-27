import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';

import Board from './Board';

// prettier-ignore
const faces = [
  '🐶', '🐱', '🐭', '🐹',
  '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮',
  '🐷', '🐸', '🐵', '🐔',
  '🦑', '🦖', '🐧', '🦆',
  '🦅', '🦉', '🦇', '🐺',
  '🐗', '🐴', '🦄', '🐝',
  '🐛', '🦋', '🐌', '🐟',
];

// possible card states:
// - face-down
// - face-up

function getCards(length) {
  const possibleFaces = shuffle(faces).slice(0, length / 2);
  const allCards = shuffle([...possibleFaces, ...possibleFaces]);
  return allCards.map((face, i) => ({
    id: i,
    face: face,
  }));
}

export default class App extends Component {
  static defaultProps = {
    size: 4,
  };

  constructor(props) {
    super(props);
    const cards = getCards(props.size);
    this.state = {
      cards: cards,
      cardsState: Array(props.size).fill('face-down'),
    };
  }

  handleBoardChange = card => {
    const newCardsState = [...this.state.cardsState];

    newCardsState[card.id] = 'face-up';

    this.setState({
      cardsState: newCardsState,
    });
  };

  render() {
    const { cards, cardsState } = this.state;
    return (
      <div className="container">
        <Board
          cards={cards}
          cardsState={cardsState}
          onChange={this.handleBoardChange}
        />
      </div>
    );
  }
}
