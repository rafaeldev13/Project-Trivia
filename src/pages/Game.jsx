import React from 'react';
import PropTypes from 'prop-types';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      resultAPI: [],
    };
  }

  componentDidMount() {
    this.callingAPI();
  }

  callingAPI = async () => {
    const myItem = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${myItem}`);
    const data = await response.json();

    if (data.results.length === 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ resultAPI: data.results });
    }
  }

  render() {
    const { resultAPI } = this.state;
    return (
      <div>
        { resultAPI.length > 0 && (
          <>
            <p>{resultAPI[0].category}</p>
            <p>{resultAPI[0].question}</p>
            <button />
            <button />
          </>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
