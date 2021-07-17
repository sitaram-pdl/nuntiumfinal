import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";


export default class Logout extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;

    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
    };
  }
  logoutButtonFunction = (e) => {
    localStorage.removeItem("token");

    return <Redirect to="/" />;
  };
  render() {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
       
      </div>
    );
  }
}
