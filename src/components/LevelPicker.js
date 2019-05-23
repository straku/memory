import React from 'react';

export default function LevelPicker(props) {
  const { difficultyLevels, onSelect } = props;
  return (
    <div className="level-picker">
      <h1>Memory game 🙈</h1>
      <h2>Pick difficulty level:</h2>
      {difficultyLevels.map(level => (
        <button key={level.name} onClick={() => onSelect(level.name)}>
          {level.name}
        </button>
      ))}
    </div>
  );
}
