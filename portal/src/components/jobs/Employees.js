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
        
    };
  }

  componentWillMount = async () => {
    
  };

  render() {
    return (
      <div className="p-5 mb-5">
        Employees page
        <Loader />
      </div>
    );
  }
}
