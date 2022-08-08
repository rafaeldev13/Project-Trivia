import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
