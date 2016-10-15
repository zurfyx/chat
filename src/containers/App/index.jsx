import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from 'redux/modules/auth';
import Body from 'components/Body';

const Loading = () => <div className="loading">Loading...</div>;

/**
 * Application structure (components & containers).
 * App
 *     - Loading (shown when application is booting)
 *     - Body
 *             - Header
 *                     - Signin
 *                               - SigninForm
 *                     - Signup
 *                               - SignupForm
 *             - Main (<-- routes content)
 *                     - Home
 *                     - About
 *                     - ...
 */
export class App extends Component {
  componentWillMount(props) {
    this.props.load();
  }

  render() {
    const { children, user } = this.props;

    return (
      <div className="app">
        {this.props.loading
          ? <Loading />
          : <Body user={user}>{children}</Body>}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,

  load: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  loadError: PropTypes.object,

  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    loaded: state.auth.loaded,
    loadError: state.auth.loadError,

    user: state.auth.user
  }
};

export default connect(mapStateToProps, { load })(App);