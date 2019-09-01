import React from 'react';
import Header from './header';
import Banner from './banner';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import PublicListContainer from './publicListContainer';

export function publicPage(props) {

    return (
        <React.Fragment>
            <Banner />

            <Header title="Public" />
            <div className="public">

                <PublicListContainer />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.currentUser,
    };
};

export default requiresLogin()(connect(mapStateToProps)(publicPage));