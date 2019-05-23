import React, { Component } from 'react';

import shuffle from 'lodash.shuffle';

import LevelPicker from './LevelPicker';
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
// - face-down - when card is facing down
// - face-up - when card is constantly facing up (example: when you click first
//             card and wait for second card to be clicked, the first card can
//             be facing up indefinitely)
// - face-up-temp - when card is facing up but only for a moment (example: when
//                  you clicked both cards and they are not matching, we want to
//                  keep them facing up for a split moment before flipping)
// - done - card is matched and we stop all interactions with this card

// possible app states
// - start
// - playing
// - finish

const difficultyLevels = [
  { name: 'easy', size: 16 },
  { name: 'medium', size: 36 },
  { name: 'hard', size: 64 },
];

function getCards(length) {
  const possibleFaces = shuffle(faces).slice(0, length / 2);
  const allCards = shuffle([...possibleFaces, ...possibleFaces]);
  return allCards.map((face, i) => ({
    id: i,
    face: face,
  }));
}

function normalizeCardsState(cardsState) {
  return cardsState.map(state =>
    state === 'face-up-temp' ? 'face-down' : state
  );
}

function getAppStateFromCardsState(cardsState) {
  if (cardsState.filter(state => state !== 'done').length === 0) {
    return 'finish';
  }
  return 'playing';
}

const initialState = {
  appState: 'start',
  cards: [],
  cardsState: [],
  level: null,
  moves: 0,
};

class App extends Component {
  state = initialState;
  timeout = null;

  getScore() {
    const { moves, cards } = this.state;
    return 1000 / (moves / cards.length);
  }

  handleDifficultyLevelSelect = selectedLevel => {
    const numberOfCards = difficultyLevels.find(
      level => level.name === selectedLevel
    ).size;
    const cards = getCards(numberOfCards);
    this.setState({
      cards: cards,
      cardsState: Array(numberOfCards).fill('face-down'),
      appState: 'playing',
      level: selectedLevel,
      moves: 0,
    });
  };

  handleRetry = () => {
    this.setState(initialState);
  };

  clearBoard = () => {
    this.setState(state => ({
      cardsState: normalizeCardsState(state.cardsState),
    }));
  };

  handleBoardChange = card => {
    const { cards, cardsState } = this.state;
    const faceUpCardId = cardsState.findIndex(card => card === 'face-up');

    // when we clicked on card that is already matched
    if (cardsState[card.id] === 'done') {
      return;
    }

    // when we clicked on the same card in second move
    if (faceUpCardId === card.id) {
      return;
    }

    // let's prepare new state
    // new state will be created from existing state, with every "face-up-temp"
    // card state replaced with "face-down" (we want to flip them after some
    // amount of time elapsed or some interaction from the player)
    const newCardsState = normalizeCardsState([...cardsState]);

    if (faceUpCardId === -1) {
      // when first card from pair is flipped
      newCardsState[card.id] = 'face-up';
    } else if (cards[faceUpCardId].face === card.face) {
      // when second card from pair is flipped
      newCardsState[faceUpCardId] = 'done';
      newCardsState[card.id] = 'done';
    } else if (cards[faceUpCardId].face !== card.face) {
      // when second card doesn't match first card
      newCardsState[faceUpCardId] = 'face-up-temp';
      newCardsState[card.id] = 'face-up-temp';
    }

    this.setState(
      state => ({
        cardsState: newCardsState,
        moves: state.moves + 1,
        appState: getAppStateFromCardsState(newCardsState),
      }),
      () => {
        console.log(this.state.moves);
      }
    );

    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.clearBoard, 500);
  };

  render() {
    const { cards, cardsState, appState, level } = this.state;
    return (
      <div className="container">
        {appState === 'start' && (
          <LevelPicker
            difficultyLevels={difficultyLevels}
            onSelect={this.handleDifficultyLevelSelect}
          />
        )}
        {appState === 'playing' && (
          <Board
            level={level}
            cards={cards}
            cardsState={cardsState}
            onChange={this.handleBoardChange}
          />
        )}
        {appState === 'finish' && (
          <EndScreen score={this.getScore()} onRetry={this.handleRetry} />
        )}
      </div>
    );
  }
}

export default App;
