import React, { Component } from "react";
import styles from "./Formcontainer.module.css";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import "../../Cusutm.css";
import AddDisscusion from "../AddliveUpdatee/AddDisscusionmain";
import AddLiveUpdate from "../AddDisscusion/AddLiveUpdate";
import AddPodcast from "../AddPodcast/AddPodcast";
import AddNews from "../AddNews/AddNew";

const { TabPane } = Tabs;

export default class Formcontainer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Tabs defaultActiveKey="1">
          <TabPane tab=" Add Live Update" key="1">
            <AddDisscusion />
          </TabPane>
          <TabPane tab="Add Disscussion" key="2">
            <AddLiveUpdate />
          </TabPane>
          <TabPane tab="Add Podcast " key="3">
            <AddPodcast />
          </TabPane>
          <TabPane tab="Add News data" key="4">
            <AddNews />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
