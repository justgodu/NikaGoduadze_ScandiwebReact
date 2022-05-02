import React, { Component } from 'react';
import "./ProductTitle.css";
export default class ProductTitle extends Component {
  render() {
    const titleStyle = {fontSize: this.props.fontSize};
    return (
      <h1 style={titleStyle}>{this.props.title}</h1>
    )
  }
}
