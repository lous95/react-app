import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import { Redirect, Route, Switch } from "react-router-dom";
import Signup from "./components/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/signin";
import React, { Component } from "react";
import userService from "./services/userService";
import Logout from "./components/logout";
import Myprofile from "./components/myprofile";
import Events from "./components/events";


class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container-fluid flex-fill">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/events" component={Events} />
            <Route path="/myprofile" component={Myprofile} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Home} exact />
            <Redirect to="/" />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
