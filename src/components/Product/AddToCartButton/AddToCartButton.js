import React, { Component } from "react";
import CartContext from "../../../contexts/CartContext";
import "./AddToCartButton.css";
export default class AddToCartButton extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.onClickAddToCart = this.onClickAddToCart.bind(this);
  }
  onClickAddToCart() {
     if (this.props.canAddToCart) {
      const { editItem } = this.context;      
      editItem(Object.assign({},this.props.cartObject), "add");
    }
  }
  render() {
    return (
      <div className="add-to-cart-button-container">
      <button onClick={this.onClickAddToCart} className="add-to-cart-button">
        ADD TO CART
      </button>
      </div>
    );
  }
}
