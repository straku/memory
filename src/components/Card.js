import React from 'react';

export default function Card(props) {
  const { state, card, onFlip } = props;
  const className = state === 'face-up' || state === 'done' ? 'flipped' : '';
  return (
    <div className={`card ${className}`} onClick={() => onFlip(card)}>
      <div className="face">♦️</div>
      <div className="face">{card.face}</div>
    </div>
  );
}
