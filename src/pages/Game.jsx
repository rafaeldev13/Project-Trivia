import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import he from 'he';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      resultAPI: [],
      questionNumber: 0,
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

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  createRandomOptions = () => {
    const { resultAPI, questionNumber } = this.state;
    const options = [];

    resultAPI[questionNumber].incorrect_answers.map((answer, i) => {
      const option = (
        <button
          type="button"
          data-testid={ `wrong-answer-${i}` }
          key={ i }
          onClick={ (e) => this.changeOptionsColors(e) }
          name="incorrect"
        >
          { answer }
        </button>
      );
      options.push(option);
      return option;
    });

    const correctOpt = (
      <button
        type="button"
        key={ 4 }
        data-testid="correct-answer"
        name="correct"
        onClick={ (e) => this.changeOptionsColors(e) }
      >
        {resultAPI[questionNumber].correct_answer}
      </button>
    );
    options.push(correctOpt);

    const shuffledOptions = this.shuffleArray(options);
    return shuffledOptions;
  }

  changeOptionsColors = ({ target }) => {
    const parent = target.parentElement;
    const optionsArray = [...parent.children];
    optionsArray.map((option) => {
      if (option.name === 'incorrect') {
        option.classList.add('red-border');
      } else {
        option.classList.add('green-border');
      }
      return option;
    });
  }

  render() {
    const { name, score } = this.props;
    const { resultAPI, questionNumber } = this.state;

    return (
      <div>
        <img
          src={ this.createImageSrc() }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
        { resultAPI.length > 0 && (
          <>
            <p data-testid="question-category">{resultAPI[questionNumber].category}</p>
            <p data-testid="question-text">
              {he.decode(resultAPI[questionNumber].question)}
            </p>
            <div data-testid="answer-options">
              { this.createRandomOptions() }
            </div>
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
