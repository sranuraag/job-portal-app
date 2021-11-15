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
      title: "Apply",
      key: "apply",
      align: "center",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            shape="round"
            size={"small"}
            onClick={(e) => {this.handleApply(record)}}
          >
            Apply
          </Button>
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
      url: constants.jobs + "/getAll",
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

  handleApply = async (record) => {
    this.setState({ loading: true }); 

    let payload = {
      method: "POST",
      url: `${constants.jobs}/${record.id}/apply`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("user_token")}`,
      },
    };

    try {
      let response = await axios(payload);

      if (response.status === 201) {
        notification.success({
          message: `Applied for job successfully.`,
          placement: "topright",
          duration: 3,
        });
      }
    } catch (error) {
      notification.error({
        message: `Error while applying for job.`,
        placement: "topright",
        duration: 3,
      });
    }

    window.location.reload();

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <div className="p-5 mb-5">
          <div className="content-main p-5 mb-5">
            <div className="d-flex justify-content-between mb-5">
              <h5>All Jobs</h5>
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
