import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Aux from "../Aux/Auxiliary";
import Classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuth} clicked={this.sideDrawerHandler} />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token
  }
}

export default withRouter(connect(mapStateToProps)(Layout));
