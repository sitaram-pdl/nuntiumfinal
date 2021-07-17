import React, { Component } from "react";
import styles from "./AboutAuth.module.css";
import EdiText from "react-editext";
import "./Custum.css";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const bio = localStorage.getItem("writerBio");

    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }

    this.state = {
      writerBio: bio,
    };
  }
  onSave = (val) => {
    console.log("Edited Value -> ", val);
  };
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.profilecontain}>
          <div>
            <EdiText
              showButtonsOnHover
              type="textarea"
              inputProps={{
                rows: 10,
                style: {
                  backgroundColor: "#233C51",

                  color: "#E6ECF1",

                  fontWeight: 500,

                  fontSize: "14px",
                },
              }}
              buttonsAlign="before"
              editButtonContent=" "
              value={this.state.writerBio}
              onSave={this.onSave}
            />
          </div>
        </div>
      </div>
    );
  }
}
