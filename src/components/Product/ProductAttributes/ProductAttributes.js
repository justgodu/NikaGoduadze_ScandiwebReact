import React, { Component } from "react";
import "./ProductAttributes.css";
import Swatch from "./Swatch/Swatch";
import TextFilter from "./TextFilter/TextFilter";
export default class ProductAttributes extends Component {
  render() {
    return (
      <div className="attributes-container">
        {this.props.attributes
          ? this.props.attributes.map((attribute, index) => {
              switch (attribute.type) {
                case "text":
                  return (
                    <TextFilter attribute={attribute} key={index} selectedAttribute={this.props.selectedAttributes[attribute.id]} disabled={this.props.disabled} onAttributeSelect={this.props.onAttributeSelect}></TextFilter>
                  );
                case "swatch":
                  return (
                    <Swatch attribute={attribute} key={index} selectedAttribute={this.props.selectedAttributes[attribute.id]} disabled={this.props.disabled} onAttributeSelect={this.props.onAttributeSelect}></Swatch>
                  );
                default:
                  return "";
              }
            })
          : ""}
      </div>
    );
  }
}
