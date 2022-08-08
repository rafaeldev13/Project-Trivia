import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <div>
        <div data-testid="feedback-text">Nice Brotha</div>
        <p>
          {assertions < THREE
            ? <span data-testid="feedback-text">Could be better...</span>
            : <span data-testid="feedback-text">Well Done!</span>}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
