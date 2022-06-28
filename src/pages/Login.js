import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/Actions';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleBtnClick = () => {
    const { enterTrivia } = this.props;

    dispatchLoginInfo({ ...this.state });
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

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginInfo: (state) => dispatch(login(state)),
});

export default connect(null, mapDispatchToProps)(Login);
