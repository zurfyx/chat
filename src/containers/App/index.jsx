import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load, enableAuthModal } from 'redux/modules/auth';
import AppLoaded from 'components/AppLoaded';

const Loading = () => <div className="loading">Loading...</div>;

/**
 * Application structure (components & containers).
 * App
 *     - Loading (shown when application is booting)
 *     - AppLoaded
 *             - Header (optional prop.)
 *                     - Signin
 *                               - SigninForm
 *                     - Signup
 *                               - SignupForm
 *             - Main
 *                     - Home
 *                     - About
 *                     - ...
 *             - Footer (optional prop.)
 */
export class App extends Component {
  componentWillMount() {
    this.props.load();
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.appPage}>
        {this.props.isLoading ? <Loading /> : <AppLoaded {...this.props} />}
      </div>
    );
  }
}

App.propTypes = {
  header: PropTypes.element,
  main: PropTypes.element.isRequired,
  footer: PropTypes.element,

  load: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  loaded: PropTypes.bool,
  loadError: PropTypes.object,

  enableAuthModal: PropTypes.func.isRequired,
  authModal: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    loaded: state.auth.loaded,
    loadError: state.auth.loadError,

    authModal: state.auth.authModal,
  }
};

export default connect(mapStateToProps, { load, enableAuthModal })(App);