import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { required, nonEmpty } from '../validators';
import Input from './input';
import { connect } from 'react-redux';
import { fetchUserActivities, fetchUserListByTime } from '../actions/activity';
import { Link } from 'react-router-dom';

export class userListContainer extends React.Component {
    componentDidMount() {
        return this.props.dispatch(fetchUserActivities());
    }

    onSubmit(value) {
        const { time } = value;
        if(time.length < 3 ){ //rework this after MVP since this isn't a great method to refresh maybe a button instead XD
        return this.props.dispatch(fetchUserListByTime(time))
    }
        else{
            return this.props.dispatch(fetchUserActivities())
        }}

    renderResults() {
    let hrtime; 
    let hrprio
        const listItems = this.props.activities.map((activity, i) => {
            {
                switch(activity.priority){
                    case 1:
                    hrprio="1 (URGENT)"
                    break;
                    case 2:
                    hrprio="2 (Need To Do)"
                    break;
                    case 3:
                    hrprio="3 (Can Do Whenever)"
                }
                switch(activity.time){
                    case "15":
                    hrtime= "15 minutes";
                    break;
                    case "30":
                    hrtime= "30 minutes";
                    break;
                    case "45":
                    hrtime="45 minutes"
                    break;
                    case "1":
                    hrtime = "1 hour"
                    break;
                    case "1+":
                    hrtime="more than 1 hour"
                }
            }
            return <li key={i}><Link to={`/info/${activity.id}`}> {hrprio} || {hrtime} || {activity.title}</Link></li>
        }
        );
        return (
            <div className="userlistcontainer">
            <div className="listtitle">Priority || Time To Complete || Title</div>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div className="userListForm">
                <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

                    <Field
                        component={Input}
                        element="select"
                        name="time"
                        label="Search By Time"
                        validate={[required, nonEmpty]}>
                            <option value="">Select a timeframe...</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="1">1 Hour</option>
                            <option value="1+">More than 1 Hour</option>
                            <option value="000">View All</option>
                    </Field>

                    <button type="submit"><i className="fas fa-search"></i> Search</button>
                </form>
                <div className="userlistcontainer">
                    <ul>
                        {this.renderResults()}
                    </ul>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null,
    activities: state.activityReducer.userList
});
export default
    connect(mapStateToProps)
        (reduxForm({
            form: 'userlistcontainer',
            onSubmitFail: (errors, dispatch, err) => {
                console.log(err)
                dispatch(focus('userlistcontainer', Object.keys(errors)[0]))
            }
        })(userListContainer));