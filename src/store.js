import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;