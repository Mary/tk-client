import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { fetchPublic, deleteActivity, updateActivity } from '../actions/activity';
import { Redirect } from 'react-router-dom';
import Banner from './banner';
/* eslint no-restricted-globals:0 */
export class infoPage extends React.Component {
    state = {
        submitted: false
    }
    componentDidMount() {
 
        return this.props.dispatch(fetchPublic());
        
    }
    componentDidUpdate(prevProps) {
        if( this.props.selectedActivity.title !== prevProps.selectedActivity.title) {
        }
      }
      triggerDelete(id) {
        this.props.dispatch(deleteActivity(id))
        this.props.history.push("../user-list")
    }
    

     handleSubmit = (e) => {//e.target.selectedValue
        e.preventDefault()
        const allValues = { title: e.target.title.value, time: e.target.time.value, priority: e.target.priority.value, description: e.target.description.value, isPublic: e.target.isPublic.value }
        this.props.dispatch(updateActivity(this.props.selectedActivity.id, allValues))
        this.props.history.push("../user-list")
     
       
    }
    editActivity = () => {
        return (
            <>
                  <Banner />
                <Header title={this.props.selectedActivity.title} />
                <div className="editActivityForm">
                <form onSubmit={(e)=>{
        e.preventDefault();
        this.handleSubmit(e);
      }}>
                        <label>Title:</label>
                        <input
                            name="title"
                            label="Title"
                            defaultValue={this.props.selectedActivity.title}
                            ref={(node) => { this.title = node }}
                        />
                        <label>Time to Complete:</label>
                        <select //check here
                            name="time"
                            label="Time"
                            defaultValue={this.props.selectedActivity.time}
                            ref={(node) => { this.time = node }}>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="1">1 Hour</option>
                            <option value="1+">More than 1 Hour</option>
                        </select>

                        <label>Priority</label>
                        <select //check here
                            name="priority"
                            label="Priority"
                            defaultValue={this.props.selectedActivity.priority}
                            ref={(node) => { this.priority = node }}>
                            <option value="1">(1) URGENT</option>
                            <option value="2">(2) Need To Do</option>
                            <option value="3">(3) Can Do Whenever</option>
                        </select>

                        <label>Description:</label>
                        <textarea
                            name="description"
                            label="Description"
                            defaultValue={this.props.selectedActivity.description}
                            ref={(node) => { this.description = node }}
                        />
                 
                 <label>Make Public for others to see?</label>
                        <select //check here
                            name="isPublic"
                            label="Make Public for others to see?"
                            defaultValue={this.props.selectedActivity.isPublic}
                            ref={(node) => { this.priority = node }}>
                            <option value="true">Yes, Make Public</option>
                            <option value="false">No, Keep Private</option>
                        </select><br/>
                      
                        <button type="submit">
                            Update Activity</button>
                    </form>
                </div>
            </>
        )
    }


    render() {

        const id = this.props.selectedActivity ? this.props.selectedActivity.id : null;
        let deleteActivityButton;
        let editActivityButton;
        let publicStatus;
        let currentuserowned;
        let hrtime;
        let hrprio;
        switch(this.props.selectedActivity.priority){
            case 1:
            hrprio="1 (URGENT)"
            break;
            case 2:
            hrprio="2 (Need To Do)"
            break;
            case 3:
            hrprio="3 (Can Do Whenever)"
        }
        switch(this.props.selectedActivity.time){
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
        if(this.props.selectedActivity.isPublic===true){
            publicStatus="Public"
        }
        else{
            publicStatus="Private"
        }
        if(this.props.selectedActivity.user_Id === this.props.username.id) {
            currentuserowned="(You! 😊)"
        }
        if (this.state.editMode) {
            return this.editActivity()
        }
        if (this.props.selectedActivity.user_Id === this.props.username.id) {
            deleteActivityButton = (
                <button onClick={() => this.triggerDelete(id)}> Delete Activity</button>
            );
            editActivityButton = (
                <button onClick={() => this.setState({ editMode: true })}>Edit Activity</button>
            );
        }
        return (
            <React.Fragment>
                {this.state.Redirect ? <Redirect to={this.state.to} /> : null}
                <Banner />
                <Header title={this.props.selectedActivity.title} />
                {this.state.editMode ? this.editActivity() : (
                    this.props.selectedActivity && (
                        <div className="info">
                            <dl>
                                <dt>Title:</dt>
                                <dd>{this.props.selectedActivity.title}</dd>
                                <dt>Time To Complete: </dt>
                                <dd>{hrtime}</dd>
                                <dt>Priority:</dt>
                                <dd>{hrprio}</dd>
                                <dt>Description:</dt>
                                <dd>{this.props.selectedActivity.description}</dd>
                                <dt>Public or Private:</dt>
                                <dd>{publicStatus}</dd>
                                <dt>Created By:</dt>
                                <dd>{this.props.selectedActivity.createdBy} {currentuserowned}</dd>

                                {editActivityButton}
                                {deleteActivityButton}
                            </dl>
                        </div>)
                )}
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state, originalProps) => {
    const selectedActivity = state.activityReducer.publicList.find(activity => activity.id === originalProps.match.params.activityId)
        || state.activityReducer.userList.find(activity => activity.id === originalProps.match.params.activityId)
    return {
        username: state.authReducer.currentUser,
        selectedActivity
    };
};
export default (connect(mapStateToProps)(infoPage));

