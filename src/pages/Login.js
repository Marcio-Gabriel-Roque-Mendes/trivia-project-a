import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../services/fethApiTrivia';
import { addToken } from '../services/saveToken';
import { login } from '../store/Actions/index';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleBtnClick = async () => {
    const { dispatchLoginInfo, history } = this.props;
    const { name, gravatarEmail } = this.state;
    const token = await getToken();
    addToken(token);
    dispatchLoginInfo({ name, gravatarEmail });
    history.push('/games');
  }

  render() {
    const { name, gravatarEmail } = this.state;

    return (
      <div>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          name="gravatarEmail"
          type="email"
          data-testid="input-gravatar-email"
          value={ gravatarEmail }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(name.length && gravatarEmail.length) }
          onClick={ this.handleBtnClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchLoginInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginInfo: (state) => dispatch(login(state)),
});

export default connect(null, mapDispatchToProps)(Login);
