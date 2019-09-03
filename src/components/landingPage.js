import React from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Logo from '../logo.png';


export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <React.Fragment>
       
            <div className="landing-page">
            <img className="logo" src={Logo} /><br></br>
               
                <div className="desc">
                    <h2><center>Got Time To Kill?</center></h2>
1.) Time Killer Helps You Remember What You Have To Do<br/>
2.) Time Killer lets you prioritize your activities by <u>Urgency</u>, or by <u>Time</u><br/>
3.) Time Killer lets you <s>steal</s> borrow ideas from the Community if you're stumped on How to Kill Some Time!<br/>

<h3><i><center>Try it Today!</center></i></h3>
                 </div>
                <br></br>
                <Link className="black-button" to="/sign-up">Sign Up</Link>
                <Link className="black-button" to="/login">Login</Link>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);