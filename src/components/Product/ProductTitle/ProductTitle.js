import React, { Component } from 'react';
import "./ProductTitle.css";
export default class ProductTitle extends Component {
  render() {
    return (
      <h1 style={{fontSize: this.props.fontSize}}>{this.props.title}</h1>
    )
  }
}
