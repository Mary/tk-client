import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class Footer extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
        this.props.history.push('/');

    }
    render() {
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="footer">
                <span></span>
                <br />
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.currentUser !== null
});

export default connect(mapStateToProps)(Footer);