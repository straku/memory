import React from 'react';

export default function EndScreen(props) {
  const { score, onRetry } = props;
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
