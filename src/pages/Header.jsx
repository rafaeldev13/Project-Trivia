import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createImageSrc } from '../functions/gameFunctions';

class Header extends React.Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="imagem do gravatar "
          src={ createImageSrc(email) }
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
