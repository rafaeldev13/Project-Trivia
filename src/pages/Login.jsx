import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUserInfo as setUserInfoAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  handleInputChange = ({ target }) => {
    const { id } = target;
    this.setState({
      [id]: target.value,
    }, this.activeButton);
  }

  activeButton = () => {
    const { email, name } = this.state;

    if (email !== '' && name !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClickPlayButton = async (name, email) => {
    const { history, setUserInfo } = this.props;
    const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
    try {
      const response = await fetch(ENDPOINT);
      const data = await response.json();
      history.push('/game');
      const key = 'token';
      localStorage.setItem(key, data.token);
      setUserInfo({ name, email });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { email, name, isDisabled } = this.state;
    const { history } = this.props;

    return (
      <>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ () => this.handleClickPlayButton(name, email) }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/Configurações') }
        >
          Configurações do jogo
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  setUserInfo: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (userInfo) => dispatch(setUserInfoAction(userInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
