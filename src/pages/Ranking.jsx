import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      playerInfos: [],
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const playerInfos = JSON.parse(localStorage.getItem('ranking'));
    const sortedInfos = playerInfos.sort((a, b) => b.score - a.score);
    this.setState({ playerInfos: sortedInfos });
  }

  HandleClickBackToLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { playerInfos } = this.state;
    return (
      <>
        <div data-testid="ranking-title">
          Ranking
        </div>
        { playerInfos.map((player, i) => (
          <div key={ i }>
            <img src={ player.picture } alt={ player.name } />
            <p data-testid={ `player-name-${i}` }>{ player.name }</p>
            <p data-testid={ `player-score-${i}` }>{ player.score }</p>
          </div>
        )) }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.HandleClickBackToLogin() }
        >
          Voltar para Home
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
