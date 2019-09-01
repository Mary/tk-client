import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { required, nonEmpty } from '../validators';
import Input from './input';
import { connect } from 'react-redux';
import { fetchPublic, flushBrowse, fetchPublicListByTime } from '../actions/activity';
import { Link } from 'react-router-dom';

export class publicListContainer extends React.Component {
    componentDidMount() {
        return this.props.dispatch(fetchPublic());
    }

    onSubmit(value) {
        const { time } = value;
        if(time.length < 3 ){ //rework this after MVP since this isn't a great method to refresh maybe a button instead XD
        return this.props.dispatch(fetchPublicListByTime(time))
    }
        else{
            return this.props.dispatch(fetchPublic())
        }}

    renderResults() {

        const listItems = this.props.activities.map((activity, i) =>
            <li key={i}><Link to={`/info/${activity.id}`}>{activity.time} {activity.title}</Link></li>
        );
        return (
            <div className="publiclistcontainer">
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div className="publicListForm">
                <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

                    <Field
                        component={Input}
                        element="select"
                        name="time"
                        label="Time"
                        validate={[required, nonEmpty]}>
                            <option value="">Select a timeframe...</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="1">1 Hour</option>
                            <option value="1+">More than 1 Hour</option>
                            <option value="000">View All</option>
                    </Field>

                    <button type="submit"><i className="fas fa-search"></i>Search By Time</button>
                </form>
                <div className="publiclistcontainer">
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
    activities: state.activityReducer.publicList
});
export default
    connect(mapStateToProps)
        (reduxForm({
            form: 'publiclistcontainer',
            onSubmitFail: (errors, dispatch, err) => {
                console.log(err)
                dispatch(focus('publiclistcontainer', Object.keys(errors)[0]))
            }
        })(publicListContainer));