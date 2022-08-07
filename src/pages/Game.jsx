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
    const optElement = this.myRef.current;
    this.changeOptionsColors(optElement);
  }

  disableButton = () => {
    const parent = this.myRef.current.parentElement;
    const options = [...parent.children];
    options.forEach((opt) => {
      opt.disabled = true;
    });
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
      console.log('chamei api');
      this.setState({ resultAPI: data.results }, this.createRandomOptions);
    }
  }

  initializeTimer = () => {
    console.log('inicializei o timer');
    const ONE_SECOND = 1000;
    const intervalId = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
    }, ONE_SECOND);
    // é necessário inserir o intervalId no state para poder parar ele
    this.setState({ intervalId });
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
        { answer }
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
        ref={ this.myRef }
        disabled={ isDisabled }
      >
        {answer}
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

    shuffledOptions = this.shuffleArray(options);
    console.log('embaralhei as resposta e adicionei na tela');
    this.setState({ shuffledOptions }, this.initializeTimer);
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
    console.log('botei as bordas');
    this.setState({ isDisabled: true }, this.disableButton);
  }

  render() {
    const { name, score } = this.props;
    const { resultAPI, questionNumber, timer, shuffledOptions } = this.state;

    return (
      <div>
        <img
          src={ this.createImageSrc() }
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
            <div data-testid="answer-options">
              { shuffledOptions }
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
