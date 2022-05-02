import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import withHooks from "../../../Wrapper/Wrapper";

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    let isActive = this.props.location.pathname.includes(this.props.title);
    this.setState({ isActive });
  }
  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      let isActive = this.props.location.pathname === "/"+this.props.title;
      this.setState({ isActive });
    }
  }

  render() {
    return (
      <li className={this.state.isActive ? "active" : ""}>
        <NavLink to={`/${this.props.title}`}>{this.props.title}</NavLink>
      </li>
    );
  }
}

export default withHooks(MenuItem);
