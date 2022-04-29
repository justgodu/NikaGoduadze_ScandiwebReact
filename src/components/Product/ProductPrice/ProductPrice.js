import React, { Component } from "react";
import CurrencyContext from "../../../contexts/CurrencyContext";
import "./ProductPrice.css";
export default class ProductPrice extends Component {
  static contextType = CurrencyContext;
  render() {
    const { currencyIndex, currencySymbol } = this.context;
    return (
      <div className="price-container">
        <h4 className="price-title" style={{ fontSize: this.props.fontSize }}>
          Price:
        </h4>
        <h4 className="price-text">
          {currencySymbol} {this.props.prices ? this.props.prices[currencyIndex].amount : ""}
        </h4>
      </div>
    );
  }
}
