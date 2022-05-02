import React, { Component } from 'react'

export default class TextFilter extends Component {
  render() {

    const titleStyle = { fontSize: this.props.fontSize };
    return (
        <div className={"text-filter" + (this.props.disabled ? " disabled" : "")}>
        <h4
          className="attribute-title"
          style={titleStyle}
        >
          {this.props.attribute.id}:
        </h4>
        <div className="text-items">
          {this.props.attribute.items.map((attrItem, index) => (
            <div
              key={index}
              onClick={() => {
                this.props.onAttributeSelect(
                  this.props.attribute.id,
                  attrItem.id
                );
              }}
              className={
                "text-item " +
                (this.props.selectedAttribute ===
                attrItem.id
                  ? "active"
                  : "")
              }
            >
              <span>{attrItem.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
