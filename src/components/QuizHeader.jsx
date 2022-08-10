import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createImageSrc } from '../functions/gameFunctions';
import '../styles/quizHeader.css';

class QuizHeader extends React.Component {
  render() {
    const { name, score, email } = this.props;

    return (
      <div className="game-header">
        <img
          src={ createImageSrc(email) }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name" className="player-name">{ name }</p>
        <div className="header-score-container">
          <p data-testid="header-score">{ score }</p>
        </div>
      </div>
    );
  }
}

QuizHeader.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(QuizHeader);
