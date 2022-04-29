import React, { Component } from 'react'
import "./BrandTitle.css";
export default class BrandTitle extends Component {
  render() {
    return (
      <h2 className='brand-title' style={{fontSize: this.props.fontSize}}>{this.props.title}</h2>
    )
  }
}
