import React from 'react';

import Card from './Card';

export default function Board(props) {
  const { cards, cardsState, onChange } = props;
  return (
    <div className="board">
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
