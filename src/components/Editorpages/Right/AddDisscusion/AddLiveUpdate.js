import React, { Component } from "react";
import styles from "./AddLiveUpdate.module.css";
import List from "./List";

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
        category: "",
        headline: "",
        subheadline: "",
        opinion: "",
      },
      disabled: true,
      isEditing: false,
      temp_index: null,
    };

    this.handleChange = this.handleChange.bind(this);

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
      "https://nuntium.blazeclothing.store/api/discussion/list/writer",
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
                Name = ${item.name}
                Tel = ${item.tel}
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
    {
      this.state.item.headline == "" ||
      this.state.item.subheadline == "" ||
      this.state.item.opinion == "" ||
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
      item: { category: "", headline: "", subheadline: "", opinion: "" },
    });
    console.log(this.state.dir);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.item),
    };
    fetch(
      "https://nuntium.blazeclothing.store/api/discussion/register",
      requestOptions
    )
      .then((res) => {
        res.json();
        window.location.reload();
      })

      .catch(console.log);
    this.setState({ disabled: true });
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
    let url = "https://nuntium.blazeclothing.store/api/discussion/update";
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
  }

  delete(index) {
    let dir = this.state.dir;
    //console.log(dir[index]._id);
    //dir.splice(index, 1);
    const baseurl =
      "https://nuntium.blazeclothing.store/api/discussion/delete/";
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

              <div className={styles.header}>Headline </div>

              <Textarea
                type="text"
                name="headline"
                minRows={1}
                maxRows={4}
                placeholder="Enter disscussion topic"
                value={this.state.item.headline}
                onChange={this.handleChange}
                className={styles.input1}
              />
              <div className={styles.header}>
                Sub Headline
                <Textarea
                  type="text"
                  name="subheadline"
                  minRows={1}
                  maxRows={4}
                  value={this.state.item.subheadline}
                  onChange={this.handleChange}
                  placeholder="Enter sub headline "
                  className={styles.input1}
                />
              </div>

              <div className={styles.header}>
                Writer's Opinion
                <Textarea
                  type="text"
                  name="opinion"
                  placeholder="Enter   writer opinion "
                  minRows={1}
                  value={this.state.item.opinion}
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
