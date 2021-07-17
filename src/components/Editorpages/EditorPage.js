import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./Editorpage.module.css";
import Profile from "./Left/Profile/Profile";
import Formcontainer from "./Right/Formcontainer/Formcontainer";
import Author from "./Left/AboutAuth/AboutAuth";
import { FaUserCog } from "react-icons/fa";
import { Menu, Dropdown, notification, Tooltip } from "antd";
import "antd/dist/antd.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleShowlogoutmodal = this.handleShowlogoutmodal.bind(this);
    this.handleCloselogoutmodal = this.handleCloselogoutmodal.bind(this);
    const token = localStorage.getItem("token");
    let loggedIn = true;

    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      visible: false,
      show: false,
    };
  }
  handleCloselogoutmodal() {
    this.setState({ show: false });
  }

  handleShowlogoutmodal() {
    this.setState({ show: true });
  }

  logoutButtonFunction = (e) => {
    localStorage.removeItem("token");
    notification.open({
      message: "You have logged out",
    });
    console.log("cliasdk");
  };
  handleMenuClick = (e) => {
    if (e.key === "3") {
      this.setState({ visible: false });
    }
  };

  handleMenuClick = (e) => {
    if (e.key === "q") {
      this.setState({ visible: false });
    }
    alert(
      `
               You have logout :0
                `
    );
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  logoutButtonFunction = (e) => {
    localStorage.removeItem("token");

    return <Redirect to="/" />;
  };
  render() {
    const { loggedIn } = this.state;
    if (loggedIn == !true) {
      return <Redirect to="/" />;
    }

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Logout</Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.container}>
        <div className={styles.headercontainer}>
          <div className={styles.headerleft}> Nuntium .</div>

          <div className={styles.headerright}>
            <div
              onClick={this.handleShowlogoutmodal}
              style={{
                color: "white",
                cursor: "pointer",
                marginRight: "10vh",
              }}
            >
              <Tooltip placement="topLeft" title={"Logout Button"}>
                <FaUserCog
                  className={styles.icon}
                  onClick={this.handleShowlogoutmodal}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={styles.bodycontainer}>
          <div className={styles.leftcontainer}>
            <Profile />
            <Author />
          </div>
          <div className={styles.rightcontainer}>
            <Formcontainer />
          </div>
        </div>
        <div className={styles.footer}>
          Copyright {new Date().getFullYear()} @ Nuntium Pvt. Ltd.
        </div>
        <Modal show={this.state.show} onHide={this.handleCloselogoutmodal}>
          <Modal.Body>
            <h1 variant="dark">Logging out ?? </h1>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/">
              <Button variant="danger" onClick={this.logoutButtonFunction}>
                Yes
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
