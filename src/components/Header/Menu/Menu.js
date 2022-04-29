import React, { Component } from "react";
import getCategories from "../../../queries/GetCategories";
import MenuItem from "./MenuItem/MenuItem";
import "./Menu.css";

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
    
    
  }

  async componentDidMount() {
    const { categories } = await getCategories();

    const names = categories.map((category) => {
      return category.name;
    });
    this.setState({ categories: names });
  }
  render() {
    return (
      <ul className="main-menu">
        {this.state.categories.map((category, index) => (
          <MenuItem key={index} title={category}></MenuItem>
        ))}
      </ul>
    );
  }
}
