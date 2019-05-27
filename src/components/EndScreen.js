import React from 'react';

export default function EndScreen(props) {
  const { score, onRetry } = props;

  return (
    <div className="score">
      <h1>🎉🎉🎉</h1>
      <h2>
        Your score: <strong>{score}</strong>
      </h2>
      <section>
        <h3>Try again?</h3>
        <button onClick={onRetry}>of course!</button>
      </section>
    </div>
  );
}
