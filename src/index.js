import React from 'react';
import ReactDOM from 'react-dom';

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
    return (
      <div className={`card ${this.props.flipped ? 'flipped' : ''}`}>
        <div className="face">♦️</div>
        <div className="face">{this.props.face}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <div className="container">
    <Card face="🦑" flipped={false} />
  </div>,
  document.getElementById('root')
);
