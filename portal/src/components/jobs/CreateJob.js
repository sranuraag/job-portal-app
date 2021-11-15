import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import moment from "moment";
import {
  Input,
  Button,
  Select,
  Table,
  DatePicker,
  Space,
  AutoComplete,
  notification,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import constants from "../../constants";
import { Context } from "../../Context";
import Loader from "../utils/Loader";

const { TextArea } = Input;

export default class CreateJob extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      id: "",
      title: "",
      description: "",
      loading: false
    };
  }

  componentWillMount = async () => {
    if (window.location.pathname.split("/")[1] === "edit-job") {
        this.setState({ editing: true });
  
        if (!this.props.location.state) {
          this.props.history.push("/employers");
          return false;
        }
  
        let { id, title, description } = this.props.location.state;
  
        this.setState({ id, title, description });
  
      }
  };

  handleChange = (e, field) => {
    if (field === "title") {
      this.setState({ title: e.target.value });
    } else if (field === "description") {
      this.setState({ description: e.target.value });
    }
  };

  handleSave = async () => {
    let payload;
    let response;

    this.setState({ loading: true });

    let { id, editing, title, description } = this.state;

    if (!(title && description)) {
        notification.error({
          message: `Title & Description are mandatory.`,
          placement: "topright",
          duration: 3,
        });
  
        this.setState({ loading: false });
  
        return false;
      }

      if (editing) {
        payload = {
            method: "PUT",
            url: `${constants.jobs}/${id}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("user_token")}`,
            },
            data: {
              title,
              description
            },
          };

          try {
            response = await axios(payload);
    
            if (response.status === 200) {
              notification.success({
                message: `Job edited successfully.`,
                placement: "topright",
                duration: 3,
              });
            }
          } catch (error) {
            notification.error({
              message: `Error while editing Job.`,
              placement: "topright",
              duration: 3,
            });
          }

      } else {
        payload = {
            method: "POST",
            url: constants.jobs,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("user_token")}`,
            },
            data: {
                title,
                description
            },
          };
      }

      try {
        response = await axios(payload);

        if (response.status === 201) {
          notification.success({
            message: `Job created successfully.`,
            placement: "topright",
            duration: 3,
          });
        }
      } catch (error) {
        notification.error({
          message: `Error while creating Job.`,
          placement: "topright",
          duration: 3,
        });
      }

      this.setState({ loading: false });

      this.props.history.push("/employers");
  } 

  render() {
    return (
      <div className="p-5 mb-5">
        <div className="mb-5">
          <Link to="/employers">
            <div className="d-flex align-items-center">
              <ArrowLeftOutlined />
              <span className="ms-2">Back</span>
            </div>
          </Link>
        </div>
        <div className="d-flex justify-content-between mb-5">
          {this.state.editing ? (
            <h5>Edit Job ({this.state.id})</h5>
          ) : (
            <h5>Create Job</h5>
          )}
        </div>
        <div className="d-flex mb-3">
          <label for="title" className="field-label">
            Job Title
          </label>
          <Input
            placeholder="Job Title"
            value={this.state.title}
            onChange={(e) => this.handleChange(e, "title")}
            maxLength={100}
            style={{ maxWidth: "300px" }}
          />
        </div>
        <div className="d-flex mb-3">
          <label for="description" className="field-label">
            Job Description
          </label>
          <TextArea
            placeholder="Job Description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e, "description")}
            maxLength={500}
            style={{ maxWidth: "300px" }}
            rows={4}
          />
        </div>
        <div>
          <Button
            type="primary"
            shape="round"
            size={"large"}
            onClick={this.handleSave}
          >
            Save
          </Button>
        </div>
        <Loader loading={this.loading} />
      </div>
    );
  }
}
