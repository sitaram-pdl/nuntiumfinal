import React, { Component } from "react";
import styles from "./Profile.module.css";
import { Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import "./Custum.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const writerstorage = localStorage.getItem("writerPhoto");
    console.log(writerstorage);

    this.state = {
      visible: false,
      photo: writerstorage,
      photo1: "",
    };
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };
  componentDidMount() {}
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Change Profile Picture</Menu.Item>
        <Menu.Item key="1">Remove Profile picture</Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.container}>
        <div className={styles.profileimage}>
          <Dropdown
            id="barContainer"
            overlay={menu}
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.visible}
          >
            <a onClick={(e) => e.preventDefault()}>
              <img
                src={localStorage.getItem("writerPhoto")}
                className={styles.images}
              ></img>
            </a>
          </Dropdown>
        </div>
        <div className={styles.upload}></div>
        <div className={styles.profilecontain}>
          <div>Name : {localStorage.getItem("writerName")}</div>
        </div>
      </div>
    );
  }
}
