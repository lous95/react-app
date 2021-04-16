import React, { Component } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";
import Form from "react-formal";
import * as yup from 'yup';
import Input from "./common/input";

class Signup extends Component {
    
    schema = yup.object({
        name: yup.string().required().min(6),
        email: yup.string().required().min(8).email(),
        password: yup.string().required().min(6),
    })

    handleSubmit = async(formData) => {
        try {
            await http.post(`${apiUrl}/users`, formData);
            toast("Your account has been created successfully");
            this.props.history.replace("/signin");
        } catch (error) {
            if(error.response && error.response.status === 400){
                toast("This email is already in use");
            }
        }
    }

    render () {
        if(userService.getCurrentUser()){
            return <Redirect to="/"/>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <h1>Create your account now for free</h1>
                    </div>
                    <div className="col-12 mt-4">
                        <Form schema={this.schema} onSubmit={this.handleSubmit}>
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
                            <Input
                                type="password"
                                name="password"
                                label="Password"
                            />
                            <Form.Submit className="btn btn-primary">Submit</Form.Submit>
                        </Form>
                    </div>
                </div>

            </div>
        )
    }

}

export default Signup;
