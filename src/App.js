import React, { Component } from 'react';

import shuffle from 'lodash/shuffle';

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

function LevelPicker(props) {
  const { onSelect } = props;
  return (
    <div className="level-picker">
      <h1>Memory game 🙈</h1>
      <h2>Pick difficulty level:</h2>
      <button onClick={() => onSelect('easy')}>easy</button>
      <button onClick={() => onSelect('medium')}>medium</button>
      <button onClick={() => onSelect('hard')}>hard</button>
    </div>
  );
}

function Board(props) {
  const { level, cards, cardsState, onChange } = props;
  return (
    <div className={`board ${level}`}>
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          state={cardsState[card.id]}
          onFlip={onChange}
        />
      ))}
    </div>
  );
}

function Card(props) {
  const { state, card, onFlip } = props;
  const className = state === 'face-up' || state === 'done' ? 'flipped' : '';
  return (
    <div
      className={`card ${className}`}
      onClick={state === 'done' ? null : () => onFlip(card)}
    >
      <div className="face">♦️</div>
      <div className="face">{card.face}</div>
    </div>
  );
}

function Score(props) {
  const { numberOfCards, numberOfMoves, onRetry } = props;
  const score = 1000 / (numberOfMoves / numberOfCards);
  return (
    <div className="score">
      <h1>🎉🎉🎉</h1>
      <h2>
        Your score: <strong>{score.toFixed(0)}</strong>
      </h2>
      <button onClick={onRetry}>one more?</button>
    </div>
  );
}

function getCards(length) {
  const possibleFaces = shuffle(faces).slice(0, length / 2);
  const allCards = shuffle([...possibleFaces, ...possibleFaces]);
  return allCards.map((face, i) => ({
    id: i,
    face: face,
  }));
}

// possible card states: 'face-down' | 'face-up' | 'done'
// possible app states: 'start' | 'playing' | 'finish'

const difficultyLevels = {
  easy: 16,
  medium: 36,
  hard: 64,
};

const initialState = {
  appState: 'start',
  cards: [],
  cardsState: [],
  level: null,
  moves: 0,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleDifficultyLevelSelect = this.handleDifficultyLevelSelect.bind(
      this
    );
    this.handleRetry = this.handleRetry.bind(this);
  }

  handleDifficultyLevelSelect(level) {
    const numberOfCards = difficultyLevels[level];
    const cards = getCards(numberOfCards);
    this.setState({
      cards: cards,
      cardsState: Array(numberOfCards).fill('face-down'),
      appState: 'playing',
      level: level,
    });
  }

  handleRetry() {
    this.setState(initialState);
  }

  handleAppStateChange() {
    if (this.state.cardsState.filter(state => state !== 'done').length === 0) {
      this.setState({
        appState: 'finish',
      });
    }
  }

  handleBoardChange(card) {
    const { cards, cardsState } = this.state;
    const newCardsState = cardsState.slice();
    const faceUpCardId = newCardsState.findIndex(card => card === 'face-up');

    this.moves++;

    // when first card from pair is flipped
    if (faceUpCardId === -1) {
      newCardsState[card.id] = 'face-up';
      this.setState(state => ({
        cardsState: newCardsState,
        moves: state.moves + 1,
      }));
      return;
    }

    // when second card from pair is flipped
    if (cards[faceUpCardId].face === card.face) {
      newCardsState[faceUpCardId] = 'done';
      newCardsState[card.id] = 'done';
      this.setState(
        state => ({ cardsState: newCardsState, moves: state.moves + 1 }),
        this.handleAppStateChange
      );
      return;
    }

    // when second card doesn't match first card
    if (cards[faceUpCardId].face !== card.face) {
      newCardsState[faceUpCardId] = 'face-up';
      newCardsState[card.id] = 'face-up';
      this.setState(state => ({
        cardsState: newCardsState,
        moves: state.moves + 1,
      }));
      setTimeout(() => {
        newCardsState[faceUpCardId] = 'face-down';
        newCardsState[card.id] = 'face-down';
        this.setState({ cardsState: newCardsState });
      }, 500);
      return;
    }
  }

  render() {
    const { cards, cardsState, appState, level, moves } = this.state;
    return (
      <div className="container">
        {appState === 'start' && (
          <LevelPicker onSelect={this.handleDifficultyLevelSelect} />
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
          <Score
            numberOfCards={cards.length}
            numberOfMoves={moves}
            onRetry={this.handleRetry}
          />
        )}
      </div>
    );
  }
}

export default App;
