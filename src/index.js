import React from 'react';
import ReactDOM from 'react-dom';
import shuffle from 'lodash.shuffle';

import './index.css';

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

class Card extends React.Component {
  render() {
    const { card, state, onFlip } = this.props;
    return (
      <div
        className={`card ${state === 'face-up' ? 'flipped' : ''}`}
        onClick={() => onFlip(card)}
      >
        <div className="face">♦️</div>
        <div className="face">{card.face}</div>
      </div>
    );
  }
}

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

class App extends React.Component {
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

  handleFlip = card => {
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
        <div className="board">
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              state={cardsState[card.id]}
              onFlip={this.handleFlip}
            />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
