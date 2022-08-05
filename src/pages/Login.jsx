import React from 'react';

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

  render() {
    const { email, name, isDisabled } = this.state;

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
        >
          Play
        </button>
      </>
    );
  }
}

export default Login;
