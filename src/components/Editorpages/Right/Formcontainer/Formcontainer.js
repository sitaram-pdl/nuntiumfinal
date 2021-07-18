import React, { Component } from "react";
import styles from "./Formcontainer.module.css";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import "../../Cusutm.css";
import AddDisscusion from "../AddliveUpdatee/AddDisscusionmain";
import AddLiveUpdate from "../AddDisscusion/AddLiveUpdate";
import AddEpisode from "../AddEpisode/AddEpisode";
import AddNews from "../AddNews/AddNew";
import Addpodcast from "../Addpodcastmain/Addpodcast";

const { TabPane } = Tabs;

export default class Formcontainer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Tabs>
          <TabPane tab=" Add Live Update" key="1">
            <AddDisscusion />
          </TabPane>
          <TabPane tab="Add Disscussion" key="2">
            <AddLiveUpdate />
          </TabPane>

          <TabPane tab="Add News data" key="3">
            <AddNews />
          </TabPane>
          <TabPane tab="Add Podcast" key="4">
            <Addpodcast />
          </TabPane>
          <TabPane tab="Add Episode " key="5">
            <AddEpisode />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
{
  /**<TabPane tab="Add Podcast" key="5">
            <Addpodcast />
          </TabPane> */
}
