import React, { Component } from "react";

export default class Swatch extends Component {
  render() {
    const titleStyle = { fontSize: this.props.fontSize };

    return (
      <div
        className={"swatch-filter" + (this.props.disabled ? " disabled" : "")}
      >
        <h4 className="attribute-title" style={titleStyle}>
          {this.props.attribute.id}:
        </h4>
        <div className="swatch-items">
          {this.props.attribute.items.map((attrItem, index) => {
            const swatchStyle = {
              backgroundColor: attrItem.value,
              border:
                attrItem.value.toUpperCase() === "#FFFFFF"
                  ? "1px solid #000"
                  : "",
            };
            return (
              <div
                className={
                  this.props.selectedAttribute === attrItem.id
                    ? "active"
                    : "not-active"
                }
                key={index}
              >
                <div
                  key={index}
                  onClick={() => {
                    this.props.onAttributeSelect(
                      this.props.attribute.id,
                      attrItem.id
                    );
                  }}
                  style={swatchStyle}
                  className={"swatch-item"}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
