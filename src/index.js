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
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      flipped: !this.state.flipped,
    });
  }

  render() {
    return (
      <div
        className={`card ${this.state.flipped ? 'flipped' : ''}`}
        onClick={this.handleClick}
      >
        <div className="face">♦️</div>
        <div className="face">{this.props.face}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <div className="container">
    <Card face="🦑" />
  </div>,
  document.getElementById('root')
);
