import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as authActions from 'redux/modules/auth';
import NavBar from 'components/NavBar';

export class App extends Component {
  componentWillMount(props) {
    this.props.load();
  }
  render() {
    const Loading = () => <span>Loading...</span>;
    const Content = () => (
      <div className="content">
        <NavBar {...this.props} />
        <div className="content">
          {this.children}
        </div>
      </div>
    );

    return (
      <div className="content">
        {this.props.loading ? <Loading/> : <Content/>}
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  loadError: PropTypes.object,

  loggingIn: PropTypes.bool,
  logInError: PropTypes.object,

  loggingOut: PropTypes.bool,
  logOutError: PropTypes.object,

  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    loaded: state.auth.loaded,
    loadError: state.auth.loadError,

    loggingIn: state.auth.loggingIn,
    logInError: state.auth.logInError,

    loggingOut: state.auth.loggingOut,
    logOutError: state.auth.logOutError,

    user: state.auth.user
  }
};

export default connect(mapStateToProps, authActions)(App);