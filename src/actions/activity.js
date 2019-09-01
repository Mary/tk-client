

import { API_BASE_URL } from '../config.js';
import { normalizeResponseErrors } from './utils';


///////////Fetch User Activities - sorted by priority no time specification
export const FETCH_USER_ACTIVITIES_SUCCESS = 'FETCH_USER_ACTIVITIES_SUCCESS';
export const fetchUserActivitiesSuccess = activities => ({
    type: FETCH_USER_ACTIVITIES_SUCCESS,
    activities
});

export const FETCH_USER_ACTIVITIES_ERROR = 'FETCH_USER_ACTIVITIES_ERROR';
export const fetchUserActivitiesError = error => ({
    type: FETCH_USER_ACTIVITIES_ERROR,
    error
});

export const fetchUserActivities = () => (dispatch, getState) => {
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/activities/user-list`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((activities) => {

            dispatch(fetchUserActivitiesSuccess(activities))
        })
        .catch(err => {
            dispatch(fetchUserActivitiesError(err));
        });
};

/////Fetch Activities made Public - sorted by newest no time specification
export const FETCH_PUBLIC_SUCCESS = 'FETCH_PUBLIC_SUCCESS';
export const fetchPublicSuccess = activities => ({
    type: FETCH_PUBLIC_SUCCESS,
    activities
});

export const FETCH_PUBLIC_ERROR = 'FETCH_PUBLIC_ERROR';
export const fetchPublicError = error => ({
    type: FETCH_PUBLIC_ERROR,
    error
});

export const fetchPublic = () => (dispatch, getState) => {

    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/activities/public`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(fetchPublicSuccess(data)))
        .catch(err => {
            dispatch(fetchPublicError(err));
        });
};

///////////Flush Browse by time --will create a better method after MVP

export const flushBrowse = () => ({
    type: 'FLUSH_BROWSE_SUCCESS'
});

///////////Fetch time specified User list  activities
export const FETCH_USER_LIST_BY_TIME_SUCCESS = 'FETCH_USER_LIST_BY_TIME_SUCCESS';
export const fetchUserListByTimeSuccess = activities => ({
    type: FETCH_USER_LIST_BY_TIME_SUCCESS,
    activities
});

export const FETCH_USER_LIST_BY_TIME_ERROR = 'FETCH_USER_LIST_BY_TIME_ERROR';
export const fetchUserListByTimeError = error => ({
    type: FETCH_USER_LIST_BY_TIME_ERROR,
    error
});

export const fetchUserListByTime = (time) => (dispatch, getState) => {

    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/activities/user-list/${time}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(fetchUserListByTimeSuccess(data)))
        .catch(err => {
            dispatch(fetchUserListByTimeError(err));
        });
};

///////////Fetch time specified Public list  activities
export const FETCH_PUBLIC_LIST_BY_TIME_SUCCESS = 'FETCH_PUBLIC_LIST_BY_TIME_SUCCESS';
export const fetchPublicListByTimeSuccess = activities => ({
    type: FETCH_PUBLIC_LIST_BY_TIME_SUCCESS,
    activities
});

export const FETCH_PUBLIC_LIST_BY_TIME_ERROR = 'FETCH_PUBLIC_LIST_BY_TIME_ERROR';
export const fetchPublicListByTimeError = error => ({
    type: FETCH_PUBLIC_LIST_BY_TIME_ERROR,
    error
});

export const fetchPublicListByTime = (time) => (dispatch, getState) => {

    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/activities/public/${time}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(fetchPublicListByTimeSuccess(data)))
        .catch(err => {
            dispatch(fetchPublicListByTimeError(err));
        });
};

/////////Add Activity  Post
const addActivitySuccess = (newActivity) => ({
    type: 'ADD_ACTIVITY_SUCCESS',
    newActivity
})

export const addActivity = (title, time, priority, description, isPublic) => {
    return (dispatch, getState) => {
        const authToken = getState().authReducer.authToken;
        return fetch(`${API_BASE_URL}/activities`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                time,
                priority,
                description,
                isPublic
            })
        })
            .then(res => res.json())
            .then(json => dispatch(addActivitySuccess(json)))
            .catch(error => console.log(error))
    }
}

/////Update Owned Activity
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const updateActivitySuccess = activity => ({
    type: UPDATE_ACTIVITY_SUCCESS,
    activity
});

export const UPDATE_ACTIVITY_ERROR = 'UPDATE_ACTIVITY_ERROR';
export const updateActivityError = error => ({
    type: UPDATE_ACTIVITY_ERROR,
    error
});


export const updateActivity = (id, updatedActivity) => (dispatch, getState) => {

    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/activites/update/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          updatedActivity
        })
    })
    .then(res => res.json())
        .then(activity => dispatch(updateActivitySuccess(activity)))
        .catch(err => {
            dispatch(updateActivityError(err));
        });
};

///////////Delete Owned Activity
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_SUCCESS_SUCCESS';
export const deleteActivitySuccess = id => ({
    type: DELETE_ACTIVITY_SUCCESS,
    id
});

export const DELETE_ACTIVITY_ERROR = 'DELETE_ACTIVITY_ERROR';
export const deleteActivityError = error => ({
    type: DELETE_ACTIVITY_ERROR,
    error
});

export const deleteActivity = (id) => (dispatch, getState) => {

    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/activities/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(() => dispatch(deleteActivitySuccess(id)))
        .catch(err => {
            dispatch(deleteActivityError(err));
        });
};