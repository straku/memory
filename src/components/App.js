import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';

import { calculateNewCardsState } from '../game-logic';

import Board from './Board';
import EndScreen from './EndScreen';

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
// - done

// possible app states
// - playing
// - finish

function getCards(length) {
  const possibleFaces = shuffle(faces).slice(0, length / 2);
  const allCards = shuffle([...possibleFaces, ...possibleFaces]);
  return allCards.map((face, i) => ({
    id: i,
    face: face,
  }));
}

function getAppStateFromCardsState(cardsState) {
  if (cardsState.filter(state => state !== 'done').length === 0) {
    return 'finish';
  }
  return 'playing';
}

function getInitialState(size) {
  const cards = getCards(size);
  return {
    appState: 'playing',
    moves: 0,
    cards: cards,
    cardsState: Array(size).fill('face-down'),
  };
}

export default class App extends Component {
  static defaultProps = {
    size: 4,
  };

  constructor(props) {
    super(props);
    this.state = getInitialState(props.size);
  }

  getScore() {
    const { moves, cards } = this.state;
    return Math.floor(1000 / (moves / cards.length));
  }

  handleRetry = () => {
    this.setState(getInitialState(this.props.size));
  };

  handleBoardChange = card => {
    const newCardsState = calculateNewCardsState(card, this.state);

    if (newCardsState === null) {
      return;
    }

    this.setState({
      cardsState: newCardsState,
      appState: getAppStateFromCardsState(newCardsState),
      moves: this.state.moves + 1,
    });
  };

  render() {
    const { cards, cardsState, appState } = this.state;
    return (
      <div className="container">
        {appState === 'playing' ? (
          <Board
            cards={cards}
            cardsState={cardsState}
            onChange={this.handleBoardChange}
          />
        ) : null}
        {appState === 'finish' ? (
          <EndScreen score={this.getScore()} onRetry={this.handleRetry} />
        ) : null}
      </div>
    );
  }
}
