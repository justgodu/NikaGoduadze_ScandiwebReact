import logo from "../../logo.svg";
import React, { Component } from "react";
import Menu from "./Menu/Menu";
import Currency from "./Currency/Currency";
import "./Header.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cart from "./Cart/Cart";


export default class Header extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <header>
        <div className="header-container">
        <Menu></Menu>
        <img src={logo} />

        <div className="right-menu">
          <Currency></Currency>
          <Cart></Cart>
        </div>
        </div>
      </header>
    );
  }
}
