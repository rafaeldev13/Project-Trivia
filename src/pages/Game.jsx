import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  createImageSrc = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name, score } = this.props;

    return (
      <>
        <img
          src={ this.createImageSrc() }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.userInfo.name,
  email: state.userInfo.gravatarEmail,
  score: state.userInfo.score,
});

export default connect(mapStateToProps)(Game);
