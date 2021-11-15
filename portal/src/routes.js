import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Layout } from "antd";

import HeaderBar from './components/layout/HeaderBar';
import PrivateRoute from './PrivateRoute'; 
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const { Header, Content } = Layout;

export default function routes() {
    return (
      <Router>
        <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Layout style={{ minHeight: "100vh" }} >
          <Header><HeaderBar></HeaderBar></Header>
            <Content>
              <Switch>
              <PrivateRoute exact path="/employees" component={Employees} />
              <Redirect to="/employees" />
              </Switch>
            </Content>
        </Layout>
        </Switch>
      </Router>
    );
  }