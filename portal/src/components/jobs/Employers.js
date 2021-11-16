import React, { Component } from "react";

import axios from "axios";
import moment from "moment";
import { Button, Table, notification, Input, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import constants from "../../constants";
import { Context } from "../../Context";
import Loader from "../utils/Loader";

const { RangePicker } = DatePicker;

export default class Employees extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  job_columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Edit",
      key: "edit",
      align: "center",
      render: (text, record) => {
        return (
          <span
            onClick={(e) => {
              this.handleEditJob(record);
            }}
          >
            <EditOutlined />
          </span>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      align: "center",
      render: (text, record) => {
        return (
          <span
            onClick={(e) => {
              this.handleDeleteJob(record);
            }}
          >
            <DeleteOutlined />
          </span>
        );
      },
    },
  ];

  componentWillMount = async () => {
    this.setState({ loading: true });

    let jobs = [];
    let response;

    let user_token = `Bearer ${window.localStorage.getItem("user_token")}`;

    let payload = {
      method: "GET",
      url: constants.jobs,
      headers: {
        "Content-Type": "application/json",
        Authorization: user_token,
      },
    };

    try {
      response = await axios(payload);

      if (response.status === 200) {
        jobs = response.data.data;
      }
    } catch (error) {
      notification.error({
        message: `Error while fetching Jobs.`,
        placement: "topright",
        duration: 3,
      });
    }

    this.setState({ jobs, loading: false });
  };

  handleCreateJob = () => {
    this.props.history.push("/create-job");
  };

  handleEditJob = (record) => {
    this.props.history.push({
      pathname: `/edit-job/${record.id}`,
      state: {
        id: record.id,
        title: record.title,
        description: record.description,
      },
    });
  };

  handleDeleteJob = async (record) => {

    let jobs = this.state.jobs; 

    this.setState({ loading: true });

    let payload = {
      method: "DELETE",
      url: `${constants.jobs}/${record.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("user_token")}`,
      },
    };

    try {
      let response = await axios(payload);

      if (response.status === 200) {
        notification.success({
          message: `Job deleted successfully.`,
          placement: "topright",
          duration: 3,
        });

        jobs = response.data.data; 
      }
    } catch (error) {
      notification.error({
        message: `Error while deleting Job.`,
        placement: "topright",
        duration: 3,
      });
    }

    this.setState({ loading: false, jobs });
  };

  render() {
    return (
      <div>
        <div className="p-5 mb-5">
          <div className="content-main p-5 mb-5">
            <div className="d-flex justify-content-between mb-5">
              <h5>My Jobs</h5>
              <Button
                type="primary"
                shape="round"
                size={"large"}
                onClick={this.handleCreateJob}
              >
                Create Job
              </Button>
            </div>
            <div>
              <Table
                className="mt-3"
                columns={this.job_columns}
                dataSource={this.state.jobs}
                pagination={true}
              />
            </div>
          </div>
        </div>
        <Loader loading={this.state.loading} />
      </div>
    );
  }
}
