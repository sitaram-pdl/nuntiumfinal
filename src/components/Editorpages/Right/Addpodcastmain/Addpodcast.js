import React, { Component } from "react";
import styles from "./AddLiveUpdate.module.css";
import List from "./List";
import { notification, Tooltip } from "antd";
import "antd/dist/antd.css";

import Textarea from "react-textarea-autosize";
import { Button, Form, Checkbox, Radio } from "semantic-ui-react";

const options = [
  { value: "", label: "Select Option" },
  { value: "Business", label: "Business" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Science", label: "Science" },
  { value: "Sports", label: "Sports" },
  { value: "Technology", label: "Technology" },
];
export default class AddLiveUpdate extends Component {
  constructor(props) {
    super(props);
    const writerstorage = localStorage.getItem("_id");
    const todate = Date.now();

    this.state = {
      dir: [],
      item: {
        date: todate,
        _id: writerstorage,

        name: "",
        description: "",
        podcastPhoto: "",
      },

      disabled: true,
      isEditing: false,
      temp_index: null,
      podcastPhoto1: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputImageChange = this.handleInputImageChange.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.view = this.view.bind(this);
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
        this.setState({
          dir: data.reverse(),
        });
      })
      .catch(console.log);
  }

  view(item) {
    alert(
      `
      Category = ${item.category}
      Headline = ${item.headline}
     Sub headline = ${item.headline}
     Opinion=${item.Opinion}
                `
    );
  }
  handleChange1(event) {
    const name = event.target.name;
    const value = event.target.value;
    let item = this.state.item;

    item[name] = value;
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let item = this.state.item;

    item[name] = value;

    this.setState({ item: item });
  }

  add(e) {
    e.preventDefault();
    let dir = this.state.dir;
    dir.push(this.state.item);
    this.setState({
      dir: dir,
      item: { name: "", description: "" },
      newsPhoto1: "",
    });
    console.log(this.state.dir);
    console.log(localStorage.getItem("_id"));
    let formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("podcastPhoto", this.state.podcastPhoto);
    formData.append("description", this.state.description);
    formData.append("_id", localStorage.getItem("_id"));
    fetch("https://nuntium.blazeclothing.store/api/podcast/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    this.setState({ disabled: true });
    this.setState({ disabled: true });
    notification.open({
      message: "News have been succesfully Added",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  }

  edit(index) {
    let item = this.state.dir[index];
    this.setState({ conid: item._id });
    console.log(this.state.conid);
    this.setState({ item: item, isEditing: true, temp_index: index });
    this.setState({ disabled: true });
  }

  update(e) {
    e.preventDefault();
    let dir = this.state.dir;
    //console.log(dir[index]._id);
    dir[this.state.temp_index] = this.state.item;
    let url = "https://nuntium.blazeclothing.store/api/podcast/update";
    this.setState({
      dir: dir,
      item: {
        category: "",
        headline: "",
        subheadline: "",
        opinion: "",
      },
      isEditing: false,
      temp_index: null,
    });
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.item),
    };
    fetch(url.concat("/", this.state.conid), requestOptions)
      .then((res) => {
        res.json();
        window.location.reload();
      })

      .catch(console.log);
    notification.open({
      message: "News have been succesfully Updated",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
        window.location.reload();
      },
    });
  }

  delete(index) {
    let dir = this.state.dir;
    //console.log(dir[index]._id);
    //dir.splice(index, 1);
    const baseurl = "https://nuntium.blazeclothing.store/api/podcast/delete/";
    const liveupdateid = this.state.dir[index]._id;
    let completeapi = baseurl.concat(liveupdateid);
    console.log(completeapi);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(this.state.item),
    };
    fetch(completeapi, requestOptions)
      .then((res) => {
        res.json();
        window.location.reload();
      })

      .catch(console.log);
    this.setState({ dir: dir });
    console.log(this.state.dir.item._id);
    notification.open({
      message: "News have been succesfully deleted",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
        window.location.reload();
      },
    });
  }
  handleInputImageChange(event) {
    this.setState({
      podcastPhoto: event.target.files[0],
      podcastPhoto1: URL.createObjectURL(event.target.files[0]),
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.formcontain}>
          {/**<form
            method="POST"
            onSubmit={this.state.isEditing ? this.update : this.add}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="form-control"
                value={this.state.item.name}
                onChange={this.handleChange}
              />
            </div>

            <input
              type="text"
              name="tel"
              placeholder="Enter Phone"
              className="form-control"
              value={this.state.item.tel}
              onChange={this.handleChange}
            />

            <div>
              <button type="submit">
                {this.state.isEditing ? "Update" : "Save"}
              </button>
            </div>
          </form> */}
          {
            //ccccc
          }
          <div>
            <form
              method="POST"
              onSubmit={this.state.isEditing ? this.update : this.add}
            >
              <div className={styles.header}>
                Podcast name
                <Textarea
                  type="text"
                  name="name"
                  minRows={1}
                  maxRows={4}
                  placeholder="Enter Podcast name"
                  value={this.state.item.name}
                  onChange={this.handleChange}
                  className={styles.input1}
                />
              </div>
              <div className={styles.header}>
                Podcast Description
                <Textarea
                  type="text"
                  name="description"
                  minRows={1}
                  maxRows={4}
                  value={this.state.item.description}
                  onChange={this.handleChange}
                  placeholder="Enter Podcast Description "
                  className={styles.input1}
                />
              </div>
              <div className={styles.header}>Image</div>
              <input
                type="file"
                name="newsPhoto"
                onChange={this.handleInputImageChange}
              />
              <br />
              <div />
              <img
                style={{ maxWidth: "20vh", marginTop: "1em" }}
                src={this.state.podcastPhoto1}
                accept=".png, .jpg, .jpeg"
                name="podcastPhoto"
                type="file"
              />

              <div className={styles.buttoncontainer} onAuxClick={this.add}>
                <Button negative type="submit">
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
