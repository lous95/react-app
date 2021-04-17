
import * as yup from 'yup';
import Form from "react-formal";
import React, { Component } from "react";
import {toast} from "react-toastify";
import Input from "./common/input";
import http from "../services/httpService";
import { apiUrl } from "../config.json";


class EditEvent extends Component {

    state = {
        event: null,
    };

    eventSchema = yup.object({
        eventName: yup.string().min(2).max(255).required(),
        eventDescription: yup.string().min(10).max(1024).required(),
        eventAddress: yup.string().min(5).max(100).required(),
        eventPhone: yup.string().min(7).max(15).required()
    })


    async componentDidMount () {
        await http.get(`${apiUrl}/events/${this.props.match.params.id}`).then(response =>{
            console.log(response.data);
            this.setState({event: response.data});
        });
    }

    handleEditEventSubmit = async(formData) => {
        await http.put(`${apiUrl}/events/${this.props.match.params.id}`, formData).then(response =>{
            toast("Updated event details successfully");
            window.location = "/myprofile";
        }).catch(response => {
            toast("Error occured while trying to update.")
        })
    }
    render(){
        const {event} = this.state;
        return (
            <div className="container">
                {event && 
                    <div className="row">
                        <Form schema={this.eventSchema} onSubmit={this.handleEditEventSubmit} defaultValue={{ eventName: this.state.event.eventName,
                            eventDescription: this.state.event.eventDescription, eventAddress: this.state.event.eventAddress,
                            eventPhone: this.state.event.eventPhone
                        }}>
                            <Input
                                type="text"
                                name="eventName"
                                label="eventName"
                            />
                            <Input
                                type="text"
                                name="eventDescription"
                                label="eventDescription"
                            />
                            <Input
                                type="text"
                                name="eventAddress"
                                label="eventAddress"
                            />
                            <Input
                                type="phone"
                                name="eventPhone"
                                label="eventPhone"
                            />
                            <Form.Submit className="btn btn-primary">Submit Changes</Form.Submit>
                        </Form>
                        </div>
                    }   
            </div>
        )
    }


  

    

 
}

export default EditEvent;
