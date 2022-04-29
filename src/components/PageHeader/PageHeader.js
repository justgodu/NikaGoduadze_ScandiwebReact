import React, { Component } from 'react'
import "./PageHeader.css";
export default class PageHeader extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <h1 className='page-title'>{this.props.title}</h1>
    )
  }
}
