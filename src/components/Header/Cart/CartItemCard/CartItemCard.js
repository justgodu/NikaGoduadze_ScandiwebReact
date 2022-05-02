import React, { Component } from "react";
import ProductAttributes from "../../../Product/ProductAttributes/ProductAttributes";
import "./CartItemCard.css";
import ProductPrice from "../../../Product/ProductPrice/ProductPrice";
export default class CartItemCard extends Component {

  render() {
    return (
      <div className="cart-item-container">
        {this.props.product && (
            <div className="cart-item-info">
              <h5>{this.props.product.brand}</h5>
              <h5>{this.props.product.name}</h5>
              <ProductPrice prices={this.props.product.prices}></ProductPrice>
              <ProductAttributes attributes={this.props.product.attributes} selectedAttributes={this.props.item} onAttributeSelect={()=>{}} disabled={true}></ProductAttributes>
            </div>
        )}

        <div className="qty-container">
          <div onClick={()=>this.props.editItem(this.props.item, "add")} className="change-qty-button">
            <span>+</span>
          </div>
          <p>{this.props.item.qty}</p>
          <div onClick={()=>this.props.editItem(this.props.item, "substract")} className="change-qty-button">
            <span>-</span>
          </div>
        </div>

        {
          this.props.product && (
            <div className="product-image-container">
              <img className="product-image" src={this.props.product.gallery[0]} alt={this.props.product.name}/>
            </div>
          )
        }
      </div>
    );
  }
}
