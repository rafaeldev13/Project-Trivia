import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  HandleClickBackToLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <div data-testid="ranking-title">
          Ranking
        </div>
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
