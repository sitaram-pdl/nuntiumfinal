import React, { Component } from "react";
import styles from "./List.module.css";
import { BiNews } from "react-icons/bi";
import { Tooltip } from "antd";
import "antd/dist/antd.css";

class List extends Component {
  render() {
    let i = 0;
    return (
      <div className={styles.container}>
        {this.props.dir.map((item, index) => (
          <div key={index} className={styles.listcontainer}>
            <div className={styles.headline}>
              <div style={{ marginRight: "0.5em" }}></div>
              <div> Podcast name:{item.name}</div>
              <div>Podcast Description:{item.description}</div>
            </div>

            <div className={styles.buttoncontain}>
              <Tooltip placement="topLeft" title={"Click to view news"}>
                <div
                  className={styles.button1}
                  onClick={(e) => this.props.view(item, e)}
                >
                  View
                </div>
              </Tooltip>
              <Tooltip placement="topLeft" title={"Click to edit news"}>
                <div
                  className={styles.button2}
                  onClick={(e) => this.props.edit(index, e)}
                >
                  Edit
                </div>
              </Tooltip>
              <Tooltip placement="topLeft" title={"Click to delete news"}>
                <div
                  className={styles.button3}
                  onClick={(e) => this.props.delete(index, e)}
                >
                  Delete
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default List;
