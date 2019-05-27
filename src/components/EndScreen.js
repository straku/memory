import React, { Component, Fragment } from 'react';

import { saveScore } from '../api';
import TopScores from './TopScores';
import ScoreTable from './ScoreTable';

export default class EndScreen extends Component {
  state = {
    userName: '',
    scores: null,
    message: null,
    loading: false,
  };

  handleInputChange = event => {
    this.setState({
      userName: event.currentTarget.value,
    });
  };

  handleSubmit = () => {
    const { score } = this.props;
    const { userName } = this.state;
    if (userName.length > 0) {
      this.setState({
        message: null,
        loading: true,
      });
      saveScore(userName, score).then(
        scores => this.setState({ scores, loading: false }),
        err => this.setState({ message: err.message, loading: false })
      );
      return;
    }
    this.setState({
      message: 'Please provide some nickname before submitting',
    });
  };

  render() {
    const { score, onRetry } = this.props;
    const { scores, message, loading } = this.state;

    return (
      <div className="score">
        <h1>🎉🎉🎉</h1>
        <h2>
          Your score: <strong>{score}</strong>
        </h2>
        <section>
          {scores ? (
            <ScoreTable scores={scores} />
          ) : (
            <Fragment>
              <TopScores />
              <h3>Do you want to submit the score?</h3>
              <label>
                Nickname
                <input type="text" onChange={this.handleInputChange} />
              </label>
              <button onClick={this.handleSubmit}>
                {loading ? 'loading...' : 'submit'}
              </button>
              {message && <span className="error">{message}</span>}
            </Fragment>
          )}
        </section>
        <section>
          <h3>Try again?</h3>
          <button onClick={onRetry}>of course!</button>
        </section>
      </div>
    );
  }
}
