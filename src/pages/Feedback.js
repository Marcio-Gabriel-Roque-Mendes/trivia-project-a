import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createEmailUrl from '../services/createEmailUrl';

class Feedback extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { name, gravatarEmail, score, assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ createEmailUrl(gravatarEmail) }
            alt={ gravatarEmail }
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        <h1 data-testid="feedback-text">
          {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </h1>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
