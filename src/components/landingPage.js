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
               
                <i>𝕋ι𝕞乇 ᛕเ𝕝ｌє𝓡</i><br>
                </br>
                <div className="desc">
                    How to use:<br></br>

                    ᴳᵒᵗ ᵀⁱᵐᵉ ᵗᵒ ᴷⁱˡˡ? <br></br>
                    Cₒₘₚₗₑₜₑ yₒᵤᵣ ₒwₙ ₜₐₛₖₛ ₒᵣ gₑₜ ᵢdₑₐₛ fᵣₒₘ ₜₕₑ cₒₘₘᵤₙᵢₜy...

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