import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import he from 'he';

import { setScore as setScoreAction } from '../redux/actions';
import { createImageSrc, shuffleArray } from '../functions/gameFunctions';
import '../styles/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      resultAPI: [],
      questionNumber: 0,
      timer: 30,
      shuffledOptions: [],
      isDisabled: false,
      intervalId: '',
    };
  }

  componentDidMount() {
    this.callingAPI();
    this.myRef = React.createRef();
  }

  componentDidUpdate() {
    const { timer, isDisabled } = this.state;
    // é necessário usar os isDisabled, pois caso contrário,
    // ele ficará entrando continuamente no if, se o timer for igual a zero
    if (timer === 0 && isDisabled === false) {
      this.setAsIncorrect();
    }
  }

  setAsIncorrect = () => {
    // pegando o elemento através do Ref
    const optionsParent = this.myRef.current;
    const optionsArray = [...optionsParent.children];
    const optElement = optionsArray.find((option) => option.name === 'incorrect');
    this.changeOptionsColors(optElement);
  }

  disableButton = () => {
    const parent = this.myRef.current;
    const options = [...parent.children];
    options.forEach((opt) => {
      opt.disabled = true;
    });
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
      this.setState({ resultAPI: data.results }, this.createRandomOptions);
    }
  }

  initializeTimer = () => {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
    }, ONE_SECOND);
    this.setState({ intervalId });
  }

  createIncorrectOption = (answer, i) => {
    const { isDisabled } = this.state;
    const incorrectOpt = (
      <button
        type="button"
        data-testid={ `wrong-answer-${i}` }
        key={ i }
        onClick={ (e) => this.changeOptionsColors(e.target) }
        name="incorrect"
        disabled={ isDisabled }
      >
        {/* a biblioteca 'he' serve para transformar simbolos: &quot, em html normal */}
        {he.decode(answer)}
      </button>
    );
    return incorrectOpt;
  }

  createCorrectOption = (answer) => {
    const { isDisabled } = this.state;
    const correctOpt = (
      <button
        type="button"
        key={ 4 }
        data-testid="correct-answer"
        name="correct"
        onClick={ (e) => this.changeOptionsColors(e.target) }
        disabled={ isDisabled }
      >
        {he.decode(answer)}
      </button>
    );
    return correctOpt;
  }

  createRandomOptions = () => {
    const { resultAPI, questionNumber } = this.state;
    let { shuffledOptions } = this.state;
    const options = [];

    resultAPI[questionNumber].incorrect_answers.forEach((answer, i) => {
      options.push(this.createIncorrectOption(answer, i));
    });

    const answer = resultAPI[questionNumber].correct_answer;
    options.push(this.createCorrectOption(answer));

    shuffledOptions = shuffleArray(options);
    this.setState({ shuffledOptions }, () => {
      this.setButtonsToDefault();
      this.initializeTimer();
    });
  }

  changeOptionsColors = (target) => {
    const { intervalId } = this.state;
    clearInterval(intervalId);

    const parent = target.parentElement;
    const optionsArray = [...parent.children];
    optionsArray.forEach((option) => {
      if (option.name === 'incorrect') {
        option.classList.add('red-border');
      } else {
        option.classList.add('green-border');
      }
    });
    this.setState({ isDisabled: true }, this.disableButton);
    const isCorrect = target.name === 'correct';
    this.updateScore(isCorrect);
  }

  updateScore = (isCorrect) => {
    if (isCorrect) {
      const { timer, resultAPI, questionNumber } = this.state;
      const { setScore } = this.props;
      let { difficulty } = resultAPI[questionNumber];
      const hightestScore = 3;

      switch (difficulty) {
      case 'easy':
        difficulty = 1;
        break;
      case 'medium':
        difficulty = 2;
        break;
      case 'hard':
        difficulty = hightestScore;
        break;
      default:
        difficulty = 0;
      }
      const number = 10;
      const newScore = number + (timer * difficulty);
      setScore(newScore);
    }
  }

  setNextQuestion = () => {
    const { questionNumber } = this.state;
    const numberOfQuestions = 4;
    if (questionNumber < numberOfQuestions) {
      this.setState({
        isDisabled: false, timer: 30, questionNumber: questionNumber + 1,
      }, this.createRandomOptions);
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  setButtonsToDefault = () => {
    const parent = this.myRef.current;
    const options = [...parent.children];
    options.forEach((opt) => {
      opt.disabled = false;
      opt.classList.remove('red-border');
      opt.classList.remove('green-border');
    });
  }

  render() {
    const { name, score, email } = this.props;
    const { resultAPI, questionNumber, timer, shuffledOptions, isDisabled } = this.state;

    return (
      <div className="gamePageContainer">
        <img
          src={ createImageSrc(email) }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
        <p>{ timer }</p>
        { resultAPI.length > 0 && (
          <>
            <p data-testid="question-category">{resultAPI[questionNumber].category}</p>
            <p data-testid="question-text">
              {he.decode(resultAPI[questionNumber].question)}
            </p>
            <div data-testid="answer-options" ref={ this.myRef }>
              { shuffledOptions }
            </div>
          </>
        )}
        {isDisabled && (
          <button type="button" data-testid="btn-next" onClick={ this.setNextQuestion }>
            Next
          </button>)}
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(setScoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
