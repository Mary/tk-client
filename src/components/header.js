import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export function Header(props) {

    let linkurl = (props.loggedIn) ? "/dashboard" : "/";
    return (
        <div className="header">
            {props.title} <Link className="close-button" to={linkurl}>CLOSE <i className="far fa-window-close"></i></Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(Header);