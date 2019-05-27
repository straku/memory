import React from 'react';

export default function ScoreTable(props) {
  const { scores } = props;
  return (
    <div className="score-table">
      {scores.map(score => (
        <div
          className={`row ${score.currentPlayer ? 'highlight' : ''}`}
          key={score.place}
        >
          <div>{score.place}</div>
          <div>{score.nickname}</div>
          <div>{score.value}</div>
        </div>
      ))}
    </div>
  );
}
