import React, { Component } from 'react'
import "./BrandTitle.css";
export default class BrandTitle extends Component {
  render() {
    const titleStyle = {fontSize: this.props.fontSize}
    return (
      <h2 className='brand-title' style={titleStyle}>{this.props.title}</h2>
    )
  }
}
