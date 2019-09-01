import React from 'react';
import {connect} from 'react-redux';
import Bannerimg from '../logowhite.png'


export function Banner(props) {


    return (
        <div className="banner">
           <img src={Bannerimg}></img>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(Banner);