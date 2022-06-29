import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  createEmailUrl = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">
          {name}
        </p>
        <img
          src={ this.createEmailUrl() }
          alt="profile-avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.login.name,
  gravatarEmail: globalState.login.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);