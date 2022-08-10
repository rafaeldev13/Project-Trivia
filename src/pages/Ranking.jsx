import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ranking.css';

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
      <section>
        <div data-testid="ranking-title" className="ranking-title">
          <h3>Ranking</h3>
        </div>
        <div className="box">
          { playerInfos.map((player, i) => (
            <div className="list" key={ i }>
              <div className="imgBx">
                <img src={ player.picture } alt={ player.name } />
              </div>
              <div className="content">
                <h2 className="rank">
                  <small className="hashtag">#</small>
                  { i + 1 }
                </h2>
                <h4 data-testid={ `player-name-${i}` }>{ player.name }</h4>
                <p data-testid={ `player-score-${i}` }>{ player.score }</p>
              </div>
            </div>
          )) }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          className="home-button"
          onClick={ () => this.HandleClickBackToLogin() }
        >
          Voltar para Home
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
