import React, { Component } from "react";
import CurrencyContext from "../../contexts/CurrencyContext";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
export default class ProductList extends Component {
  static contextType = CurrencyContext;

  render() {
    const { currencyIndex, currencySymbol } = this.context;
    console.log(currencyIndex, currencySymbol);
    return (
      <div className="product-list">
        {this.props.products.map((product, index) => (
          <ProductCard
            id={product.id}
            image={product.gallery[0]}
            attributes={product.attributes}
            currencySymbol={currencySymbol}
            price={product.prices[currencyIndex].amount}
            brand={product.brand}
            name={product.name}
            inStock={product.inStock}
            key={index}
          ></ProductCard>
        ))}
      </div>
    );
  }
}
