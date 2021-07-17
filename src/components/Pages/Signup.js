import React, { Component, createRef } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card, Icon, Image, Input } from "semantic-ui-react";
import { Button, Form } from "semantic-ui-react";
import "./Login.css";
import { notification } from "antd";
import "antd/dist/antd.css";

export default class Login extends Component {
  buttonRef = createRef();
  handleClick = () => this.buttonRef.current.focus();

  constructor(props) {
    super(props);

    this.handleInputImageChange = this.handleInputImageChange.bind(this);
    this.handler = this.handler.bind(this);

    const token = localStorage.getItem("token");
    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }

    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      writerPhoto: "",
      bio: "",
      repassword: "",
      newsPhoto1: "",
    };
  }

  handler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleInputImageChange(event) {
    this.setState({
      writerPhoto: event.target.files[0],
      newsPhoto1: URL.createObjectURL(event.target.files[0]),
    });
  }
  formSubmit = (e) => {
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("phone", this.state.phone);
    formData.append("address", this.state.address);
    formData.append("writerPhoto", this.state.writerPhoto);
    formData.append("bio", this.state.bio);
    fetch("https://nuntium.blazeclothing.store/api/writer/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    this.setState({ disabled: true });
    notification.open({
      message: "User Registered successfully",
      description: "Now You can add news",
    });
  };

  render() {
    return (
      <div
        style={{
          height: "100vh",
        }}
      >
        <div className="Login-container">
          <div className="Login-component">
            <div
              style={{
                marginBottom: "130px",
              }}
            >
              <Card
                style={{
                  alignItems: "center",
                  marginTop: "30px",

                  backgroundColor: "#171717",
                  width: "550px",
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

              <div
                style={{
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  paddingTop: "40px",

                  marginTop: "20px",

                  backgroundColor: "#171717",
                  width: "550px",
                  height: "700px",
                  OverflowY: "scroll",
                  border: "1px solid white",
                  borderRadius: "10px",
                  overflowY: "scroll",
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
                      Your Name:
                    </text>
                    <Form.Input
                      icon="user"
                      iconPosition="left"
                      placeholder="Username"
                      type="email"
                      name="name"
                      style={{ marginTop: "5px" }}
                      value={this.state.name}
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
                      Email:
                    </text>
                    <Form.Input
                      icon="user"
                      iconPosition="left"
                      placeholder=" Email"
                      type="email"
                      name="email"
                      style={{ marginTop: "5px" }}
                      value={this.state.email}
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
                      type="text"
                      style={{ marginTop: "5px" }}
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
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
                      Re-Password :{" "}
                    </text>

                    <Form.Input
                      icon="lock"
                      iconPosition="left"
                      type="text"
                      style={{ marginTop: "5px" }}
                      name="repassword"
                      placeholder="Re-Password"
                      value={this.state.repassword}
                      onChange={this.handler}
                    />
                  </Form.Field>

                  {this.state.repassword == this.state.password ? null : (
                    <text style={{ color: "red" }}>
                      password and re password is not equal
                    </text>
                  )}

                  <Form.Field>
                    <text
                      style={{
                        color: "White",
                        fontStyle: " sans-serif",
                        marginTop: "10px",
                        fontSize: "20px",
                      }}
                    >
                      Phone :{" "}
                    </text>

                    <Form.Input
                      icon="phone"
                      iconPosition="left"
                      type="number"
                      style={{ marginTop: "5px" }}
                      name="phone"
                      placeholder="Phone"
                      value={this.state.phone}
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
                      Address :{" "}
                    </text>

                    <Form.Input
                      icon="address book"
                      iconPosition="left"
                      type="text"
                      style={{ marginTop: "5px" }}
                      name="address"
                      placeholder="Address"
                      value={this.state.address}
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
                      Bio :{" "}
                    </text>

                    <Form.TextArea
                      icon="address book"
                      iconPosition="left"
                      rows="2"
                      type="text"
                      style={{ marginTop: "5px" }}
                      name="bio"
                      placeholder="Bio"
                      value={this.state.bio}
                      onChange={this.handler}
                    />
                  </Form.Field>
                  <text
                    style={{
                      color: "White",
                      fontStyle: " sans-serif",
                      marginTop: "10px",
                      fontSize: "20px",
                    }}
                  >
                    Image :{" "}
                  </text>
                  <input
                    type="file"
                    name="writerPhoto"
                    onChange={this.handleInputImageChange}
                  />
                  <br />
                  <div />
                  <img
                    style={{ maxWidth: "20vh", marginTop: "1em" }}
                    src={this.state.newsPhoto1}
                  />
                  <Link to="/">
                    <Button
                      negative
                      onClick={this.formSubmit}
                      style={{
                        marginTop: "20px",
                        marginLeft: "70%",
                        marginBottom: "10px",
                      }}
                    >
                      Submit
                    </Button>
                  </Link>
                </Form>
              </div>
              <div style={{ marginTop: "20px" }}>
                <text
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "white",
                    marginLeft: "150px",
                  }}
                >
                  Already have account <Link to="/">Login </Link>
                </text>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
