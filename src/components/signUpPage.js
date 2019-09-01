import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './header';
import Banner from './banner';
import SignUpForm from './signUpForm';

export function SignUpPage(props) {

    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <React.Fragment>
            <Banner />
            <Header title="Sign Up" />
            <div className="signuppage">

                <SignUpForm />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(SignUpPage);