import React , { Component } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import Event from "./common/events";
import userService from "../services/userService";
import axios from "axios";



class Events extends Component {
    state = {
        searchby: "eventName",
        query: '',
        events: null,
        filteredData: null,
        id: userService.getCurrentUser()._id
    };

    handleInputChange = event => {
        const query = event.target.value;
        const { searchby } = this.state;
        this.setState(prevState => {
            const filteredData = prevState.events.filter(event => {
                const search = event[searchby];
                return search.toLowerCase().includes(query.toLowerCase());
            });
            return {
                query,
                filteredData
            }
        })
    };
    searchbyFunc = event => {
        this.setState({searchby: event.target.value});
    }

    async likeEventFunc(id){
        await http.post(`${apiUrl}/events/like-event`, {id}).then(response => {
               const {filteredData} = this.state;
               var likedEvent = filteredData.filter(event => {
                    return event._id === id;
               });
               for( var x = 0; x < filteredData.length; x++){
                    if(filteredData[x]._id === likedEvent[0]._id){
                        filteredData[x].likes.push(this.state.id);
                        this.setState({filteredData: filteredData});
                    }
               }
        });
    }

    async componentDidMount () {
        await axios.get(`${apiUrl}/events/all-events`).then(response =>{
            const { query } = this.state;
            const { searchby } = this.state;
            const filteredData = response.data.filter(event => {
                const search = event[searchby];
                return search.toLowerCase().includes(query.toLowerCase());
              });
            this.setState({events: response.data, filteredData: filteredData});
        });
    }
 
    render () {
        const {events, filteredData} = this.state;
        return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-9">
                    <h2>Our Up coming <span className="badge badge-secondary">Events!</span></h2>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <form>
                            <input
                                placeholder="Search for..."
                                value={this.state.query}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                            </form>
                        </div>
                        <div className="col-1">
                            <span className="badge badge-secondary">By</span>
                        </div>
                        <div className="col-5">
                            <select name="searchby" id="searchby" className="custom-select" onChange={this.searchbyFunc} value={this.state.searchby}>
                                <option value="eventName">event name</option>
                                <option value="eventAddress">Location</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                {filteredData != null ? (
                   filteredData.map((event) => <Event event={event}
                    key={event._id}
                    likeEventFunc={() => this.likeEventFunc(event._id)}
                    likes={event.likes.length}
                    disable={event.likes.includes(this.state.id)}/>)
                        ): ( 
                        <div className="col-12">
                                <p>No upcoming Events at the moment, be the first one to create a new event and share it with the world!</p>
                        </div>
                    )}
            </div>
        </div>)
    }

}

export default Events;
