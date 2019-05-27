import React, { Component } from 'react';

import { getTopScores } from '../api';
import ScoreTable from './ScoreTable';

export default class TopScores extends Component {
  state = {
    scores: null,
    message: null,
    loading: true,
  };

  componentDidMount() {
    getTopScores().then(
      scores => this.setState({ scores, loading: false }),
      err => this.setState({ message: err.message, loading: false })
    );
  }

  render() {
    const { scores, message, loading } = this.state;

    return (
      <section>
        {loading && <span>Top scores loading...</span>}
        {scores && <ScoreTable scores={scores} />}
        {message && <span>Cannot load top scores 😔</span>}
      </section>
    );
  }
}
