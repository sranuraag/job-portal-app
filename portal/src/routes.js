import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Layout } from "antd";

import HeaderBar from './components/layout/HeaderBar';
import PrivateRoute from './PrivateRoute'; 
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Employees from './components/jobs/Employees';
import Employers from './components/jobs/Employers';
import CreateJob from './components/jobs/CreateJob';

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
              <PrivateRoute exact path="/employers" component={Employers} />
              <PrivateRoute exact path="/create-job" component={CreateJob} />
              <PrivateRoute exact path="/edit-job/:id" component={CreateJob} />
              <Redirect to="/employees" />
              </Switch>
            </Content>
        </Layout>
        </Switch>
      </Router>
    );
  }