import React from 'react';
import { reduxForm, Field, focus, reset } from 'redux-form';
import { required, nonEmpty, isTrimmed } from '../validators';
import Input from './input';
import {addActivity} from '../actions/activity';

export class addActivityForm extends React.Component {//this.state.title onChange saves to the state everytime it changes
    onSubmit(values) {
        const {title, time, priority, description, isPublic} = values;
     console.log(values)
        return this.props.dispatch(addActivity(title, time, priority, description, isPublic))
        .then(()=>this.props.dispatch(reset('addActivity')))
    }

        render() {
            return (
                <div className="addActivityForm">
                    <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                        <Field
                            component={Input}
                            name="title"
                            label="Title"
                            placeholder="placeholder"
                            validate={[required, nonEmpty, isTrimmed]}
                        />
                        <Field
                            component={Input}
                            element="select"
                            name="time"
                            label="Time To Complete"
                            validate={[required, nonEmpty]}>
                            <option value="">Select a timeframe...</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="1">1 Hour</option>
                            <option value="1+">More than 1 Hour</option>
                        </Field>
                        <Field
                            component={Input}
                            element="select"
                            name="priority"
                            label="Set Your Priority"
                            validate={[required, nonEmpty]}>
                            <option value="">Select Priority...</option>
                            <option value="1">(1) URGENT</option>
                            <option value="2">(2) Need To Do</option>
                            <option value="3">(3) Can Do Whenever</option>
                     
                        </Field>

                        <Field
                            component={Input}
                            element="textarea"
                            name="description"
                            label="Description"
                        />
                        <Field
                            component={Input}
                            element="select"
                            name="isPublic"
                            label="Make Public for others to see?"
                            validate={[required, nonEmpty]}>
                            <option value=""></option>
                            <option value="true">Yes, Make Public</option>
                            <option value="false">No, Keep Private</option>
        
                     
                        </Field>
                        
                        <button type="submit"><i className="fas fa-plus-square"></i> Add Activity</button>
                    </form>
                </div>
            );
        }
    }


export default reduxForm({
    form: 'addActivity',
    onSubmitFail: (errors, dispatch, err) =>{
        console.log(err)
        dispatch(focus('addactivity', Object.keys(errors)[0]))
    }
})(addActivityForm);