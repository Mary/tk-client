import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import Footer from './footer';
import Logo from '../logo.png';


export function Dashboard(props) {

    return (
        <React.Fragment>
            <img class="logo" src={Logo}/>
            <div className="dashboard">
            
                
                <Link className="black-button" to="/add-activity">Add Activity</Link>
                <Link className="black-button" to="/user-list">View Your Activities</Link>
                <Link className="black-button" to="/public">View Public Activities</Link>
            </div>
            <Footer { ...props}/>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.currentUser,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));