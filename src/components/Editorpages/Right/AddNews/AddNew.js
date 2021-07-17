import React, { Component } from "react";
import styles from "./AddNews.module.css";
import List from "./List";
import { Dropdown } from "semantic-ui-react";
import Textarea from "react-textarea-autosize";
import { Button, Form, Checkbox, Radio } from "semantic-ui-react";
import { notification } from "antd";
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

    var now = new Date();
    now.setMinutes(now.getMinutes() + 345); // timestamp
    now = new Date(now); // Date object
    //console.log(now);
    this.state = {
      dir: [],
      item: {
        headline: "",
        article: "",

        category: "",
        newsPhoto: "",
        _id: writerstorage,
        keyword: "",
        date: Date(now),
      },
      disabled: true,
      isEditing: false,
      newsPhoto1: "",
      temp_index: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
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
      "https://nuntium.blazeclothing.store/api/news/list/writer",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dir: data.reverse(),
        });
      })
      .catch(console.log);
  }
  view(item) {
    alert(
      `
      
      headline = ${item.headline}
      article = ${item.article}
               
                category = ${item.category} 
                keyword= ${item.keyword}
               
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

    this.setState({ item: item });
    {
      this.state.item.headline == "" ||
      this.state.item.article == "" ||
      this.state.item.category == "" ||
      this.state.item.keyword == ""
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
      newsPhoto1: "",
      item: {
        headline: "",
        article: "",
        news: "",
        category: "",
        newsPhoto: "",
        keyword: "",
      },
    });
    console.log(this.state.dir);
    let formData = new FormData();
    formData.append("article", this.state.item.article);
    formData.append("headline", this.state.item.headline);
    formData.append("category", this.state.item.category);
    formData.append("keyword", this.state.item.keyword);
    formData.append("_id", localStorage.getItem("_id"));
    formData.append("newsPhoto", this.state.newsPhoto);
    fetch("https://nuntium.blazeclothing.store/api/news/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    this.setState({ disabled: true });
    notification.open({
      message: "News Added",
      description: "News has been successfully added",
    });
  }

  edit(index) {
    let item = this.state.dir[index];
    this.setState({ item: item, isEditing: true, temp_index: index });
    this.setState({ conid: item._id });
    this.setState({ disabled: true });
    this.setState({
      newsPhoto1: this.state.dir[index].photoPath,
    });
    console.log(this.state.item);
  }

  update(e) {
    e.preventDefault();
    let dir = this.state.dir;
    dir[this.state.temp_index] = this.state.item;
    let url = "https://nuntium.blazeclothing.store/api/news/update";
    console.log(this.state.conid);
    this.setState({
      dir: dir,
      item: {
        headline: "",
        article: "",
        news: "",
        category: "",
        newsPhoto: "",

        keyword: "",
      },
      isEditing: false,
      temp_index: null,
    });

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline: this.state.item.headline,
        article: this.state.item.article,
        category: this.state.item.category,
        keyword: this.state.item.article,
      }),
    };
    fetch(url.concat("/", this.state.conid), requestOptions)
      .then((res) => {
        res.json();
        window.location.reload();
      })

      .catch(console.log);
    notification.open({
      message: "News Updated",
      description: "News has been successfully updated",
    });
  }

  delete(index) {
    let dir = this.state.dir;
    // dir.splice(index, 1);
    const baseurl = "https://nuntium.blazeclothing.store/api/news/delete/";
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
    this.setState({ dir: dir });
    notification.open({
      message: "News Deleted",
      description: "News has been successfully Deleted",
    });
  }

  handleInputImageChange(event) {
    this.setState({
      newsPhoto: event.target.files[0],
      newsPhoto1: URL.createObjectURL(event.target.files[0]),
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
                Article
                <Textarea
                  type="text"
                  name="article"
                  placeholder="Enter article"
                  minRows={1}
                  value={this.state.item.article}
                  onChange={this.handleChange}
                  maxRows={20}
                  className={styles.textarea1}
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
                src={this.state.newsPhoto1}
                accept=".png, .jpg, .jpeg"
              />
              <div className={styles.header}>
                Keywords
                <Textarea
                  type="text"
                  name="keyword"
                  minRows={1}
                  maxRows={4}
                  value={this.state.item.keyword}
                  onChange={this.handleChange}
                  placeholder="Enter keyword"
                  className={styles.input1}
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
