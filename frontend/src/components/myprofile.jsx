import React , { Component } from "react";
import * as yup from "yup";
import Form from "react-formal";
import userService from "../services/userService";
import profileImage from "../images/profile.jpg";
import { Modal , Button} from "react-bootstrap";
import Input from "./common/input";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import Event from "./common/myevents";

class Myprofile extends Component {
    state = {
        userInfo:null,
        events: null,
        showEditInfoModal:false,
        showCreateNewEventModal:false,
        id: userService.getCurrentUser()._id
    };

    schema = yup.object({
        name: yup.string().required().min(6),
        email: yup.string().required().min(8).email(),
    })
    eventSchema = yup.object({
        eventName: yup.string().min(2).max(255).required(),
        eventDescription: yup.string().min(10).max(1024).required(),
        eventAddress: yup.string().min(5).max(100).required(),
        eventPhone: yup.string().min(7).max(15).required()
    })
    
    async componentDidMount () {
        await http.get(`${apiUrl}/users/${this.state.id}`).then(response => {
            this.setState({ userInfo: this.mapToState(response.data)});
        });
        await http.get(`${apiUrl}/events/my-events`).then(response =>{
            this.setState({events: response.data});
        });
    }

    mapToState(user) {
        const {
            name,
            email
        } = user;
        return {
            name,
            email
        };
      }
    
    handleCloseModal = () => {
        this.setState({showEditInfoModal:false});
    }
    handleOpenModal = () => {
        this.setState({showEditInfoModal:true});
    }

    handleSubmit = async (formData) => {
        await http.put(`${apiUrl}/users/${this.state.id}`, formData).then( response => {
            this.setState({userInfo: this.mapToState(response.data), showEditInfoModal:false});    
        });
    }

    handleCloseCreateNewEventModal = () => {
        this.setState({showCreateNewEventModal:false});
    }
    handleOpenCreateNewEventModal = () => {
        this.setState({showCreateNewEventModal:true});
    }

    handleCreateEventSubmit = async(formData) => {
        await http.post(`${apiUrl}/events`, formData ).then(response => {
           this.setState({events: response.data, showCreateNewEventModal:false });
        });
    }
    handleDeleteEvent = async(id) => {
        await http.delete(`${apiUrl}/events/${id}`).then(response => {
            this.setState({events: response.data});
        })
    }
 
    render () {
        const {events} = this.state;
        return (
           <div>
              {this.state.userInfo && 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <img src={profileImage} alt="profile image" className="profile-img mt-5"/>
                        </div>
                        <div className="col-lg-6 col-md-12 mt-5">
                            <div className="mt-5">
                                Name: {this.state.userInfo.name}
                            </div>
                            <div className="mt-3">
                                Email: {this.state.userInfo.email}
                            </div>
                            <button className="btn btn-primary mt-3" onClick={this.handleOpenModal}>Edit Profile</button>
                        </div>
                    </div>
                    <Modal show={this.state.showEditInfoModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form schema={this.schema} onSubmit={this.handleSubmit} defaultValue={{ name: this.state.userInfo.name, email: this.state.userInfo.email }}>
                                <Input
                                    type="text"
                                    name="name"
                                    label="Name"
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email"
                                />
                                <Form.Submit className="btn btn-primary">Submit Changes</Form.Submit>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <div className="row">
                        <div className="col-6">
                            <h5><span class="badge bg-secondary">Your events</span></h5>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger float-right" onClick={this.handleOpenCreateNewEventModal}>Create a new event</button>
                        </div>
                    </div>
                    <div className="row">
                        {events != null ? (
                        events.map((event) => <Event event={event} key={event._id} eventDeleteFunction={() => this.handleDeleteEvent(event._id)} />)
                            ): ( 
                            <div className="col-12">
                                <p>No Event, create your first Event and share it with the world!</p>
                            </div>
                        )}
                    </div>
                    <Modal show={this.state.showCreateNewEventModal} onHide={this.handleCloseCreateNewEventModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a new Event!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form schema={this.eventSchema} onSubmit={this.handleCreateEventSubmit}>
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
                        </Modal.Body>
                    </Modal>
                </div>
              }
           </div>   
        )
    }

}

export default Myprofile;
