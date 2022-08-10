import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuizHeader from '../components/QuizHeader';
import { createImageSrc } from '../functions/gameFunctions';
import { clearPlayer } from '../redux/actions';

import '../styles/feedback.css';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score, email } = this.props;
    const myObj = { name, score, picture: createImageSrc(email) };

    if (localStorage.getItem('ranking')) {
      const dataArr = JSON.parse(localStorage.getItem('ranking'));
      dataArr.push(myObj);
      localStorage.setItem('ranking', JSON.stringify(dataArr));
    } else {
      localStorage.setItem('ranking', JSON.stringify([myObj]));
    }
  }

  handleRedirectTo = (route) => {
    const { history, clearState } = this.props;
    if (route) {
      history.push(`/${route}`);
    } else {
      history.push('/');
    }
    clearState();
  }

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <div className="feedback-page-container">
        <QuizHeader />
        <div className="feedback-container">
          <p className="feedback-text">
            {assertions < THREE
              ? (
                <span
                  data-testid="feedback-text"
                  className="bad-played"
                >
                  Could be better...
                </span>
              )
              : (
                <span
                  data-testid="feedback-text"
                  className="well-played"
                >
                  Well Done!
                </span>
              )}
          </p>
          <div className="feedback-data-container">
            <div className="feedback-data">
              <p className="feedback-data-text">Score:</p>
              <div
                className="feedback-data-number"
                data-testid="feedback-total-score"
              >
                {score}
              </div>
            </div>
            <div className="feedback-data">
              <p className="feedback-data-text">Assertions:</p>
              <p
                className="feedback-data-number"
                data-testid="feedback-total-question"
              >
                {assertions}
              </p>
            </div>
          </div>
          <div className="buttons-container">
            <button
              type="button"
              data-testid="btn-play-again"
              className="feedback-button"
              onClick={ () => this.handleRedirectTo() }
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              className="feedback-button"
              onClick={ () => this.handleRedirectTo('ranking') }
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  clearState: () => dispatch(clearPlayer()),
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  clearState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
