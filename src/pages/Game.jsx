import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

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

  createImageSrc = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
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
    const { name, score } = this.props;

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
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.userInfo.name,
  email: state.userInfo.gravatarEmail,
  score: state.userInfo.score,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
