import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import activityReducer from './activityReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    activityReducer,
    form : formReducer
})

export default rootReducer