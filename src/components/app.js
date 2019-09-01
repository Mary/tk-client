import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import LandingPage from './landingPage';
import Dashboard from './dashboard';
import SignUpPage from './signUpPage';
import LoginPage from './loginPage';
import AddActivityPage from './addActivityPage';
import UserListPage from './userListPage';
import PublicPage from './publicPage';
// import KillTimePage from './killTimePage';
import InfoPage from './infoPage';


import { refreshAuthToken } from '../actions/auth';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {

            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {

            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/sign-up" component={SignUpPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/add-activity" component={AddActivityPage} />
                <Route exact path="/user-list" component={UserListPage} />
                <Route exact path="/public" component={PublicPage} />
                {/* <Route exact path="/kill-time" component={KillTimePage} /> */}
                <Route exact path="/info/:activityId" component={InfoPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.authToken !== null,
    loggedIn: state.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));