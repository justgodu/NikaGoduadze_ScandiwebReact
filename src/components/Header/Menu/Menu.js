import React, { Component } from "react";
import MenuItem from "./MenuItem/MenuItem";
import "./Menu.css";

export default class Menu extends Component {
  render() {
    return (
      <ul className="main-menu">
        {this.props.categories.map((category, index) => (
          <MenuItem key={index} title={category}></MenuItem>
        ))}
      </ul>
    );
  }
}
