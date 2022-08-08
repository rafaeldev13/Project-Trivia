import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
  handleRedirectTo = (route) => {
    const { history } = this.props;
    if (route) {
      history.push(`/${route}`);
    } else {
      history.push('/');
    }
  }

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">Nice Brotha</div>
        <p>
          {assertions < THREE
            ? <span data-testid="feedback-text">Could be better...</span>
            : <span data-testid="feedback-text">Well Done!</span>}
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.handleRedirectTo() }
        >
          Play Again

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.handleRedirectTo('ranking') }
        >
          Ranking

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
