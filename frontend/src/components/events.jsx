import React , { Component } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import Event from "./common/events";



class Events extends Component {
    state = {
        query: '',
        events: null,
        filteredData: null,
    };

    handleInputChange = event => {
        const query = event.target.value;


        this.setState(prevState => {
            const filteredData = prevState.events.filter(event => {
                return event.eventName.toLowerCase().includes(query.toLowerCase());
            });
            return {
                query,
                filteredData
            }
        })
     
    };

   

    async componentDidMount () {
        await http.get(`${apiUrl}/events/all-events`).then(response =>{
            const { query } = this.state;
            const filteredData = response.data.filter(event => {
                return event.eventName.toLowerCase().includes(query.toLowerCase());
              });
            this.setState({events: response.data, filteredData: filteredData});
        });
    }
 
    render () {
        const {events, filteredData} = this.state;
        return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    Our Up coming Events!
                </div>
            </div>
            <div className="row">
                <form>
                    <input
                        placeholder="Search for..."
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                </form>
            </div>
            <div className="row">
                {filteredData != null ? (
                   filteredData.map((event) => <Event event={event} key={event._id} />)
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
