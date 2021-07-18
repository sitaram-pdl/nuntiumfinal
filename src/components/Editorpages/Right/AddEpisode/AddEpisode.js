import React, { Component } from "react";
import styles from "./AddPodcast.module.css";
import List from "./List";
import { Dropdown } from "semantic-ui-react";
import Textarea from "react-textarea-autosize";
import { Button, Form, Checkbox, Radio } from "semantic-ui-react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { notification } from "antd";
import "antd/dist/antd.css";
export default class AddDisscusionmain extends Component {
  constructor(props) {
    super(props);
    const writerstorage = localStorage.getItem("_id");

    this.state = {
      dir: [],
      podcast: [],
      item: {
        name: "",
        description: "",
        guest: "",
        audioPath: "",
        date: Date(),
        _id: "",
        episodeName: "",
        episodeDescription: "",
      },
      disabled: false,
      isEditing: false,
      audioPath1: "",
      temp_index: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.edit1 = this.edit1.bind(this);
    this.addEpisode = this.addEpisode.bind(this);
    this.update = this.update.bind(this);
    this.view = this.view.bind(this);
    this.handleInputImageChange = this.handleInputImageChange.bind(this);
  }
  componentDidMount() {
    this.setState({});
    this.setState({ dir: [] });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: localStorage.getItem("_id") }),
    };
    fetch(
      "https://nuntium.blazeclothing.store/api/podcast/list/writer",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dir: data.reverse(),
        });
        console.log(this.podcast);
        console.log(this.dir);
      });
  }

  view(item) {
    alert(
      `
                Name = ${item.name}
                Tel = ${item.tel}
                `
    );
  }
  handleChange1 = ({ target }) => {
    this.setState({
      selectedOption: target.value,
    });
  };

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let item = this.state.item;

    item[name] = value;

    console.log(this.category);

    this.setState({ item: item });
  }

  addEpisode(index) {
    let item = this.state.dir[index];
    this.setState({ item: item, isEditing: true, temp_index: index });
    this.setState({ disabled: true });
  }
  viewEpisode(index) {}
  add = (e) => {
    let dir = this.state.dir;
    // dir.push(this.state.item);
    this.setState({
      dir: dir,
      item: {
        episodeName: "",
        episodeDescription: "",
        guest: "",
        audioPath: "",
      },
    });
    console.log(this.state.dir);
    let formData = new FormData();

    formData.append("podcast", this.state.conid);
    formData.append("name", this.state.item.episodeName);
    formData.append("date", this.state.item.date);
    formData.append("description", this.state.item.episodeDescription);
    formData.append("guest", this.state.item.guest);
    formData.append("_id", localStorage.getItem("_id"));

    formData.append("podcastEpisode", this.state.audioPath);
    fetch("https://nuntium.blazeclothing.store/api/episode/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    this.setState({ disabled: true });
    console.log(this.state.item.category);
    console.log(this.state.item.name);
    console.log(this.state.item.date);
    console.log(this.state.item.description);
    console.log(this.state.item.guest);
    console.log(this.state.item.audioPath);
    notification.open({
      message: "Podcast Episode has been added",
      description: "New Podcast Added Sucessfully",
    });
    this.setState({ disabled: true });
  };

  edit(index) {
    let item = this.state.dir[index];
    this.setState({ item: item, isEditing: true, temp_index: index });
    this.setState({ disabled: true });
    this.setState({ conid: item._id });
    console.log(this.state.conid);
  }
  edit1(event) {
    this.setState({ category: event.target.value });
  }

  update(e) {
    e.preventDefault();

    let dir = this.state.dir;
    dir.push(this.state.item);
    this.setState({
      dir: dir,
      item: {
        episodeName: "",
        episodeDescription: "",
        guest: "",
        audioPath: "",
      },
    });
    console.log(this.state.dir);
    let formData = new FormData();

    formData.append("podcast", this.state.conid);
    formData.append("name", this.state.item.episodeName);
    formData.append("date", this.state.item.date);
    formData.append("description", this.state.item.episodeDescription);
    formData.append("guest", this.state.item.guest);
    formData.append("_id", localStorage.getItem("_id"));
    formData.append("podcastEpisode", this.state.audioPath);
    fetch("https://nuntium.blazeclothing.store/api/episode/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    this.setState({ disabled: true });
    console.log(this.state.item.category);
    console.log(this.state.item.episodeName);
    console.log(this.state.item.date);
    console.log(this.state.item.episodeDescription);
    console.log(this.state.item.guest);
    console.log(this.state.item.audioPath);
    notification.open({
      message: "Podcast Episode has been added",
      description: "New Podcast Added Sucessfully",
    });
    this.setState({ disabled: true });
  }

  delete(index) {
    let dir = this.state.dir;
    dir.splice(index, 1);
    this.setState({ dir: dir });
  }

  handleInputImageChange(event) {
    this.setState({
      audioPath: event.target.files[0],
      audioPath1: URL.createObjectURL(event.target.files[0]),
    });
    this.state.item.audioPath == ""
      ? this.setState({ disabled: true })
      : this.setState({ disabled: false });
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.formcontain}>
          <div>
            <form
              method="POST"
              onSubmit={this.state.isEditing ? this.update : this.add}
            >
              <div className={styles.header1}>Podcast Name</div>

              <Textarea
                type="text"
                name="name"
                minRows={1}
                maxRows={4}
                placeholder="Enter Episode Headline "
                value={this.state.item.name}
                className={styles.input1}
              />

              <div className={styles.header}>Episode name </div>

              <Textarea
                type="text"
                name="episodeName"
                minRows={1}
                maxRows={4}
                placeholder="Enter Episode Headline "
                value={this.state.item.episodeName}
                onChange={this.handleChange}
                className={styles.input1}
              />
              <div className={styles.header}>
                Episode Description
                <Textarea
                  type="text"
                  name="episodeDescription"
                  minRows={1}
                  maxRows={4}
                  value={this.state.item.episodeDescription}
                  onChange={this.handleChange}
                  placeholder="Enter   Podcast info"
                  className={styles.input1}
                />
              </div>

              <div className={styles.header}>
                Guest
                <Textarea
                  type="text"
                  name="guest"
                  placeholder="Enter  Speaker Name"
                  minRows={1}
                  value={this.state.item.guest}
                  onChange={this.handleChange}
                  maxRows={2}
                  className={styles.textarea1}
                />
              </div>
              <div className={styles.header}>Audio</div>
              <input
                type="file"
                name="podcastEpisode"
                onChange={this.handleInputImageChange}
                accept=".mp3"
              />
              <AudioPlayer
                style={{
                  width: "400px",
                  marginTop: "1em",
                }}
                src={this.state.audioPath1}
                onPlay={(e) => console.log("onPlay")}
                // other props here
              />
              <div className={styles.buttoncontainer}>
                <Button negative type="submit " onclick={this.add}>
                  {this.state.isEditing ? "Update" : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.listcontain}>
          <List
            dir={this.state.dir}
            delete={this.delete}
            edit={this.edit}
            view={this.view}
          />
        </div>
      </div>
    );
  }
}
