import React from 'react';

export default function Card(props) {
  const { state, card, onFlip } = props;
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
