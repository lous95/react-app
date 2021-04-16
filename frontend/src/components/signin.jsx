
import userService from "../services/userService";
import PageHeader from "./common/pageheader";
import { Redirect } from "react-router-dom";
import * as yup from 'yup';
import Form from "react-formal";
import React, { Component } from "react";
import {toast} from "react-toastify";
import Input from "./common/input";


class Signin extends Component {
  
  schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6)
  })

  handleSubmit = async (formData) => {
    console.log(formData.email);
    try {
        await userService.login(formData.email, formData.password);
        window.location = "/"
    } catch (error) {
      if ( error.response && error.response.status === 400){
        toast("Error in your credentials please try again");
      }
    }
  } 

  render() {
    if (userService.getCurrentUser()){
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <PageHeader titleText="Signin for Royal App" />
        <div className="row">
          <div className="col-12">
            <p>Sign in with your account</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <Form schema={this.schema} onSubmit={this.handleSubmit}> 
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
    );
  }
}

export default Signin;
