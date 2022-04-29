import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import "./ProductCard.css";

export default class ProductCard extends Component {
  static contextType = CartContext;

  addToCart(event) {
    event.preventDefault();
    const { editItem } = this.context;
    let tempItem = {
      id: this.props.id,
    };
    for (const attr of this.props.attributes) {
      tempItem[attr.id] = attr.items[0].id;
    }
    editItem(tempItem, "add");
  }
  render() {
    return (
      <Link to={`/product/${this.props.id}`}>
        <div
          className={`product-card ${this.props.inStock ? "" : "not-in-stock"}`}
        >
          <div className="image-container">
            <img
              className="product-image"
              alt={this.props.name}
              src={this.props.image}
            ></img>
            <div
              style={
                this.props.inStock ? { display: "none" } : { display: "block" }
              }
              className="out-of-stock-cover"
            >
              OUT OF STOCK
            </div>
            <img
              onClick={this.addToCart.bind(this)}
              alt="add to cart"
              className="add-to-cart-button"
              src="/add-to-cart.svg"
            ></img>
          </div>
          <p className="product-title">
            {this.props.brand} {this.props.name}
          </p>
          <p className="product-price">
            {this.props.currencySymbol + " " + this.props.price}
          </p>
        </div>
      </Link>
    );
  }
}
