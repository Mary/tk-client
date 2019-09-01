const initialState = {
    userList: [],
    publicList: [],
    error: null
    }
    
    
    const activity = (state = initialState, action) => {
        switch (action.type) {
            case 'ADD_ACTIVITY_SUCCESS':
                return {
                    ...state,
                    data: action.newActivity
                }
                case 'FETCH_USER_ACTIVITIES_SUCCESS':
                return {
                    ...state,
                    userList: action.activities
                }
                case 'FETCH_PUBLIC_SUCCESS':
                return {
                    ...state,
                    publicList: action.activities
                }
                case 'FETCH_USER_LIST_BY_TIME_SUCCESS':
                return {
                    ...state,
                    userList: action.activities
                }
                case 'FETCH_PUBLIC_LIST_BY_TIME_SUCCESS':
                return {
                    ...state,
                    publicList: action.activities
                }
                case 'FLUSH_BROWSE_SUCCESS':
                return {
                    ...state,
                    publicList: [],
                    userList: []
                }
                case 'UPDATE_ACTIVITY_SUCCESS':
                return {
                    ...state,
                    userList: state.activities.map(activity=>{
                        if(activity.id === action.activity.id){
                            return action.activity;
                        }
                        return activity;
                    })
                }
                case 'DELETE_ACTIVITY_SUCCESS':
                return {
                    ...state,
                    userList: state.userList.filter(activity=>{
                        return activity.id !== action.id
                    }),
                    publicList: state.publicList.filter(activity=>{
                        return activity.id !== action.id
                    })
                }
            default:
                return state
        }
    }
    
    
    
    
    
    export default activity