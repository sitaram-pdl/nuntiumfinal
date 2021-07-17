import React, { Component, createRef } from "react";
import { Redirect, Link } from "react-router-dom";

import { Card, Icon, Image, Input } from "semantic-ui-react";
import { Button, Form, Checkbox, Radio } from "semantic-ui-react";
import { notification } from "antd";
import "antd/dist/antd.css";
import "./Login.css";

export default class Login extends Component {
  buttonRef = createRef();
  handleClick = () => this.buttonRef.current.focus();

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }

    this.state = {
      username: "",
      value: "",
      password: "",
      LoggedIn,
      Location: "",
    };
  }

  handleChange = (e, { value }) => this.setState({ value });
  handler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  formSubmit = (e) => {
    e.preventDefault();
    // console.log("key");
    const { username, password } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password: password }),
    };

    fetch(
      "https://nuntium.blazeclothing.store/api/writer/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", "token");
        localStorage.setItem("_id", data._id);
        localStorage.setItem("writerName", data.name);
        localStorage.setItem("writerPhoto", data.photoPath);
        localStorage.setItem("writerBio", data.bio);

        this.setState({
          LoggedIn: true,
          Location: "Editor",
        });
        // console.log(data);
      })
      .catch((error) => {
        notification.open({
          message: "Invalid Email or Password",
          description:
            "Please! Enter correct credentials to login to the system",
          onClick: () => {
            console.log("Notification Clicked!");
            this.setState({
              username: "",

              password: "",
            });
          },
        });
      });
  };

  render() {
    const { LoggedIn, Location } = this.state;

    if (LoggedIn) {
      return <Redirect to="/EditorPage012" />;
    }

    return (
      <div className="Login-component">
        <div
          style={{
            display: " flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "130px",
          }}
        >
          <Card
            style={{
              alignItems: "center",
              marginTop: "130px",

              backgroundColor: "#171717",
              width: "400px",
              height: "60px",
            }}
          >
            <h2
              style={{
                fontFamily: " fantasy",
                alignItems: "center",
                color: "#e02a02",
                marginTop: "12px",
                fontSize: "30px",
              }}
            >
              Nuntium
            </h2>
          </Card>
          <Card
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "40px",

              marginTop: "20px",

              backgroundColor: "#171717",
              width: "450px",
              height: "270px",
            }}
          >
            <Form inverted>
              <Form.Field>
                <text
                  style={{
                    color: "White",
                    fontStyle: " sans-serif",
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  Email :{" "}
                </text>

                <Form.Input
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  type="username"
                  name="username"
                  style={{ marginTop: "5px" }}
                  value={this.state.username}
                  onChange={this.handler}
                />
              </Form.Field>

              <Form.Field>
                <text
                  style={{
                    color: "White",
                    fontStyle: " sans-serif",
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  Password :{" "}
                </text>

                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  style={{ marginTop: "5px" }}
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handler}
                />
                <Button
                  negative
                  onClick={this.formSubmit}
                  style={{ marginTop: "20px", marginLeft: "70%" }}
                >
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </Card>
          <text style={{ fontSize: "18px", fontWeight: 500, color: "white" }}>
            Dont have account <Link to="/SignUp">Sign up </Link>
          </text>
        </div>
      </div>
    );
  }
}
