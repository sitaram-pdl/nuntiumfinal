import React, { Component } from "react";
import styles from "./AddDisscusion.module.css";
import List from "./List";
import { Dropdown } from "semantic-ui-react";
import Textarea from "react-textarea-autosize";
import { Button, Form, Checkbox, Radio } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { notification, Tooltip } from "antd";
import "antd/dist/antd.css";

const options = [
  { value: "", label: "Select Option" },
  { value: "Business", label: "Business" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Science", label: "Science" },
  { value: "Sports", label: "Sports" },
  { value: "Technology", label: "Technology" },
];
export default class AddDisscusionmain extends Component {
  constructor(props) {
    super(props);
    const writerstorage = localStorage.getItem("_id");
    const todate = Date.now();

    this.state = {
      dir: [],
      item: {
        category: "",
        headline: "",
        subheadline: "",
        date: todate,
        _id: writerstorage,
      },
      disabled: true,
      isEditing: false,
      temp_index: null,
      conid: "",
      show: false,
      newid: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.view = this.view.bind(this);
    this.handleShowlivemodal = this.handleShowlivemodal.bind(this);
    this.handleCloselivemodal = this.handleCloselivemodal.bind(this);
  }
  componentDidMount() {
    this.setState({});
    this.setState({ dir: [] });
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //  body: JSON.stringify({ email: username, password: password }),
    };
    fetch(
      "https://nuntium.blazeclothing.store/api/liveupdate/list",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dir: data.reverse().filter(function (data) {
            return data.writer == localStorage.getItem("_id");
          }),
        });
      })
      .catch(console.log);
  }

  view(item) {
    alert(
      `
      category = ${item.category}
      Headline= ${item.headline}
      Sub Headline = ${item.headline}
                `
    );
  }

  handleCloselivemodal() {
    this.setState({ show: false });
  }

  handleShowlivemodal() {
    this.setState({ show: true });
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

    this.setState({ item: item });
    {
      this.state.item.headline == "" ||
      this.state.item.subheadline == "" ||
      this.state.item.category == ""
        ? this.setState({ disabled: true })
        : this.setState({ disabled: false });
    }
  }

  add(e) {
    e.preventDefault();

    let dir = this.state.dir;
    dir.push(this.state.item);
    this.setState({
      dir: dir,
      item: {
        category: "",
        headline: "",
        subheadline: "",
      },
    });
    console.log(this.state.dir);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.item),
    };
    fetch(
      "https://nuntium.blazeclothing.store/api/liveupdate/register",
      requestOptions
    )
      .then((res) => {
        res.json();
        window.location.reload();
      })

      .catch(console.log);

    this.setState({ disabled: true });
    notification.open({
      message: "News have been succesfully added",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
        window.location.reload();
      },
    });
  }

  edit(index) {
    let item = this.state.dir[index];
    this.setState({ conid: item._id });
    console.log(this.state.conid);
    this.setState({ item: item, isEditing: true, temp_index: index });
    this.setState({ disabled: false });
  }

  update(e) {
    e.preventDefault();
    let dir = this.state.dir;
    dir[this.state.temp_index] = this.state.item;
    let url = "https://nuntium.blazeclothing.store/api/liveupdate/update";
    console.log(this.state.conid);
    this.setState({
      dir: dir,
      item: {
        category: "",
        headline: "",
        subheadline: "",
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
      message: "News have been succesfully updated",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
        window.location.reload();
      },
    });
  }
  deleteModal(index) {
    this.setState({ show: true, newid: this.state.dir[index]._id });
  }
  delete(index) {
    let dir = this.state.dir;
    console.log(dir[index]._id);
    //dir.splice(index, 1);
    const abc = "abc";
    const baseurl =
      "https://nuntium.blazeclothing.store/api/liveupdate/delete/";
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
        //window.location.reload();
      })

      .catch(console.log);
    this.setState({ dir: dir });
    notification.open({
      message: "News have been succesfully deleted",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
        window.location.reload();
      },
    });
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
              <div className={styles.header1}>Select category</div>
              <div className={styles.selectborder}>
                <select
                  value={this.state.item.category}
                  onChange={this.handleChange}
                  className={styles.select}
                  name="category"
                >
                  {options.map(({ value, label }, index) => (
                    <option value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div className={styles.header}>Headline</div>

              <Textarea
                type="text"
                name="headline"
                minRows={1}
                maxRows={4}
                placeholder="Enter headline"
                value={this.state.item.headline}
                onChange={this.handleChange}
                className={styles.input1}
              />

              <div className={styles.header}>
                Sub Headline
                <Textarea
                  type="text"
                  name="subheadline"
                  placeholder="Enter subheadline"
                  minRows={1}
                  value={this.state.item.subheadline}
                  onChange={this.handleChange}
                  maxRows={20}
                  className={styles.textarea1}
                />
              </div>
              <div className={styles.buttoncontainer}>
                <Button negative disabled={this.state.disabled} type="submit">
                  {this.state.isEditing ? "Update" : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleCloselivemodal}>
          <Modal.Body>
            <h1 variant="dark">Do youu wanna delete </h1>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.delete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
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
