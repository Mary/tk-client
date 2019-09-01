import {API_BASE_URL} from '../config.js';

const signUpUserSuccess = (user) => ({
    type: 'SIGNUP_USER_SUCCESS',
    user
})

export const signUpUser = (user) => {
    return (dispatch) => { 
        return fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(json => dispatch(signUpUserSuccess(json)))
            .catch(error => console.log(error))
    }
}
