import React, { Component } from "react";
import { withRouter } from 'react-router'; 

import { Layout, Menu, Breadcrumb } from "antd";

import { UserOutlined } from "@ant-design/icons";

import { Context } from "../../Context";

class HeaderBar extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
        selectedKey: "employees"
    };
  }

  handleMenuClick = (e) => {
    console.log(e.key); 
    this.setState({ selectedKey: e.key }); 

    if (e.key === 'employees') {
        this.props.history.push("/employees"); 
    } else if (e.key === 'employers') {
        this.props.history.push("/employers"); 
    }
  }

  handleLogout = () => {
    window.localStorage.removeItem("user_token"); 
    this.props.history.push('/signin'); 
  }

  render() {
    return (
      <div className="d-flex justify-content-between">
        <div className="d-flex header-bar align-items-center ">
          <div className="me-5">
            <h4 className="header-brand">Job Portal App</h4>
          </div>
          <div style={{ width: "400px"}}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[this.state.selectedKey]}
              onClick={this.handleMenuClick}
            >
              <Menu.Item key={"employees"}>Employees</Menu.Item>
              {this.context.user.role === "Employer" ? (
                <Menu.Item key={"employers"}>Employers</Menu.Item>
              ) : (
                ""
              )}
            </Menu>
          </div>
        </div>
        <div className="d-flex">
          <div className="header-content me-5 d-flex align-items-center">
          <UserOutlined className="user-logo me-2"/> {this.context.user.first_name}{" "}
            {this.context.user.last_name}
          </div>
          <div className="header-content logout" onClick={this.handleLogout}>Logout</div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderBar); 