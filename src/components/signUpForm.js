import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { signUpUser } from '../actions/user';
import { loginUser } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
const passwordLength = length({ min: 7, max: 16 });
const matchesPassword = matches('password');

export class SignUpForm extends React.Component {
    onSubmit(values) {
        const { username, password } = values;
        const user = { username, password };
        return this.props
            .dispatch(signUpUser(user))
            .then(() => this.props.dispatch(loginUser(username, password)));
    }

    render() {
        return (
            <form
                className="sign-up-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>

                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Sign Up
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signup',
    onSubmitFail: (errors, dispatch, err) => {
        console.log(err)
        dispatch(focus('signup', Object.keys(errors)[0]))
    }
})(SignUpForm); 
