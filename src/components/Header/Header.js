import logo from "../../logo.svg";
import React, { Component } from "react";
import Menu from "./Menu/Menu";
import Currency from "./Currency/Currency";
import "./Header.css";
import Cart from "./Cart/Cart";


export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-container">
        <Menu categories={this.props.categories}></Menu>
        <img src={logo} alt="Logo"/>

        <div className="right-menu">
          <Currency></Currency>
          <Cart></Cart>
        </div>
        </div>
      </header>
    );
  }
}
