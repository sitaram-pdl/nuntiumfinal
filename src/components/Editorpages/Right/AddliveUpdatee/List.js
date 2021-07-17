import React, { Component } from "react";
import styles from "./List.module.css";
import { BiNews } from "react-icons/bi";

class List extends Component {
  render() {
    let i = 0;
    return (
      <div className={styles.container}>
        {this.props.dir.map((item, index) => (
          <div key={index} className={styles.listcontainer}>
            <div className={styles.headline}>
              <div style={{ marginRight: "0.5em" }}></div>
              <div>{item.headline}</div>
              <div>{item.subheadline}</div>
            </div>

            <div className={styles.buttoncontain}>
              <div
                className={styles.button1}
                onClick={(e) => this.props.view(item, e)}
              >
                View
              </div>
              <div
                className={styles.button2}
                onClick={(e) => this.props.edit(index, e)}
              >
                Edit
              </div>
              <div
                className={styles.button3}
                onClick={(e) => this.props.delete(index, e)}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default List;
