import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Input, Button, notification, Select } from "antd";

import constants from "../../constants";
import Loader from "../utils/Loader";

const { Option } = Select;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      loading: false,
      role: "Employee"
    };
  }

  handleChange = (e, field) => {
    if (field === "firstName") {
      this.setState({ firstName: e.target.value });
    } else if (field === "lastName") {
      this.setState({ lastName: e.target.value });
    } else if (field === "email") {
      this.setState({ email: e.target.value });
    } else if (field === "password") {
      this.setState({ password: e.target.value });
    }
  };

  handleRoleChange = (value) => {
    this.setState({ role: value }); 
  }

  handleSignUp = async () => {
    this.setState({ loading: true });

    let {
      firstName = "",
      lastName = "",
      email = "",
      password = "",
      role = "Employee"
    } = this.state;

    if (!(email && password && role)) {
      notification.error({
        message: `Email, Password & Role are mandatory.`,
        placement: "topright",
        duration: 3,
      });

      this.setState({ loading: false });
      return false;
    }

    let payload = {
      method: "POST",
      url: constants.users,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role
      },
    };

    try {
      let response = await axios(payload);

      if (response.status === 201) {
        notification.success({
          message: `User created successfully.`,
          placement: "topright",
          duration: 3,
        });

        this.props.history.push("/signin");
      }
    } catch (error) {
      notification.error({
        message: `Error during User sign up.`,
        placement: "topright",
        duration: 3,
      });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center main">
        <div>
          <div className="mb-5 d-flex justify-content-center">
            <h6>Sign Up for Job Portal!</h6>
          </div>
          <div className="d-flex mb-4">
            <label for="first-name" className="field-label">
              First Name
            </label>
            <Input
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(e) => this.handleChange(e, "firstName")}
              maxLength={100}
            />
          </div>
          <div className="d-flex mb-4">
            <label for="last-name" className="field-label">
              Last Name
            </label>
            <Input
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(e) => this.handleChange(e, "lastName")}
              maxLength={100}
            />
          </div>
          <div className="d-flex mb-4">
            <label for="email" className="field-label">
              Email
            </label>
            <Input
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e, "email")}
              maxLength={100}
              type={"email"}
            />
          </div>
          <div className="d-flex mb-4">
            <label for="password" className="field-label">
              Password
            </label>
            <Input
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e, "password")}
              maxLength={100}
              type={"password"}
            />
          </div>
          <div className="d-flex mb-4">
            <label for="role" className="field-label">
              Role
            </label>
            <Select
              style={{ width: 250 }}
              placeholder="Role"
              onChange={this.handleRoleChange}
              value={this.state.role}
            >
              <Option value="Employee">Employee</Option>
              <Option value="Employer">Employer</Option>
            </Select>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              type="primary"
              shape="round"
              size={"large"}
              onClick={this.handleSignUp}
            >
              Sign Up
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <p>
              Click <Link to="/signin">here</Link> to Sign In
            </p>
          </div>
        </div>
        <Loader loading={this.state.loading} />
      </div>
    );
  }
}
