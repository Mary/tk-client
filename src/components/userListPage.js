import React from 'react';
import Header from './header';
import Banner from './banner';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import UserListContainer from './userListContainer';

export function UserListPage(props) {

    return (
        <React.Fragment>
            <Banner />
            <Header title="Personal Activities" />
            <div className="userlist">
                <UserListContainer {...props} />
                <Link className="black-button" to="/add-activity">Add Activity</Link>
                <Link className="black-button" to="/public">View Public List</Link>
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.currentUser,
    };
};

export default requiresLogin()(connect(mapStateToProps)(UserListPage));