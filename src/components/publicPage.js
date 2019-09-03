import React from 'react';
import Header from './header';
import Banner from './banner';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import PublicListContainer from './publicListContainer';

export function publicPage(props) {

    return (
        <React.Fragment>
            <Banner />

            <Header title="Public Activities" />
            <div className="publiclist">

                <PublicListContainer />
                <Link className="black-button" to="/add-activity">Add Activity</Link>
                <Link className="black-button" to="/user-list">View Your List</Link>
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