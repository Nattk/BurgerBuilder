import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions/index";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  state = {
    authCheckout: false
  };

  componentWillMount() {
    this.props.onAutoSignup();
  }

  render() {
    let routes = (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/checkout" component={asyncCheckout} />
              <Route path="/auth" component={asyncAuth} />
              <Route path="/orders" component={asyncOrders} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </BrowserRouter>
      );
    }

    return routes;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(actionCreators.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
