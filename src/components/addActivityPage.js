import React from 'react';
import Header from './header';
import Banner from './banner';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import AddActivityForm from './addActivityForm';

export function addActivityPage(props) {

    return (
        <React.Fragment>
                        <Banner/>
            <Header title="Add Activity" />
            <div className="addactivity">
                <AddActivityForm />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.currentUser,
    };
};

export default requiresLogin()(connect(mapStateToProps)(addActivityPage));


