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
    const displayIfOutOfStock = this.props.inStock
      ? { display: "none" }
      : { display: "block" };

    const productCardClass = `product-card ${
      this.props.inStock ? "" : "not-in-stock"
    }`;
    return (
      <Link to={`/product/${this.props.id}`}>
        <div className={productCardClass}>
          <div className="image-container">
            <img
              className="product-image"
              alt={this.props.name}
              src={this.props.image}
            ></img>
            <div style={displayIfOutOfStock} className="out-of-stock-cover">
              OUT OF STOCK
            </div>
            {this.props.inStock && (
              <img
                onClick={this.addToCart.bind(this)}
                alt="add to cart"
                className="add-to-cart-button"
                src="/add-to-cart.svg"
              ></img>
            )}
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
