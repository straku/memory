import React, { Component } from 'react';

// prettier-ignore
const faces = [
  '🐶', '🐱', '🐭', '🐹',
  '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮',
  '🐷', '🐸', '🐵', '🐔',
  '🦑', '🦖'
];

const Card = ({ flipped, children, onClick }) => (
  <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
    <div className="face">♦️</div>
    <div className="face">{children}</div>
  </div>
);

class App extends Component {
  state = {
    clicked: false,
  };

  handleClick = () =>
    this.setState(state => ({
      clicked: !state.clicked,
    }));

  render() {
    return (
      <div className="container">
        <div className="board">
          {[...faces, ...faces].map((face, i) => (
            <Card
              key={i}
              flipped={this.state.clicked}
              onClick={this.handleClick}
            >
              {face}
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
