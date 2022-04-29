import React, { Component } from "react";
import ProductAttributes from "../../../Product/ProductAttributes/ProductAttributes";
import "./CartPageItemCard.css";
import ProductPrice from "../../../Product/ProductPrice/ProductPrice";
export default class CartPageItemCard extends Component {
  constructor(props) {
    super(props);

    this.state={
      galleryIndex: 0
    }
  }

  changeGalleryIndex(action){
    switch(action){
      case "add":
        if(this.state.galleryIndex === this.props.product.gallery.length-1){
          this.setState({galleryIndex: 0})
        }else{
          this.setState({galleryIndex: this.state.galleryIndex + 1})
        }
        break;
      case "substract":
        if(this.state.galleryIndex === 0){
          this.setState({galleryIndex: this.props.product.gallery.length-1})
        }else{
          this.setState({galleryIndex: this.state.galleryIndex - 1})
        }
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <div className="cart-item-container">
        {this.props.product && (
          <div className="cart-item-info">
            <h5>{this.props.product.brand}</h5>
            <h5>{this.props.product.name}</h5>
            <ProductPrice prices={this.props.product.prices}></ProductPrice>
            <ProductAttributes
              attributes={this.props.product.attributes}
              selectedAttributes={this.props.item}
              onAttributeSelect={() => {}}
              disabled={true}
            ></ProductAttributes>
          </div>
        )}

        <div className="cart-item-right-side">
          <div className="qty-container">
            <div
              onClick={() => this.props.editItem(this.props.item, "add")}
              className="change-qty-button"
            >
              <span>+</span>
            </div>
            <p>{this.props.item.qty}</p>
            <div
              onClick={() => this.props.editItem(this.props.item, "substract")}
              className="change-qty-button"
            >
              <span>-</span>
            </div>
          </div>

          {this.props.product && (
            <div className="product-image-container">
              <div className="product-image">
                <div className="arrow-container">
                  <div className="left-arrow" onClick={()=>this.changeGalleryIndex("substract")}><img src="/left-arrow.svg"></img></div>
                  <div className="right-arrow" onClick={()=>this.changeGalleryIndex("add")}><img src="/left-arrow.svg"></img></div></div>
                <img
                  src={this.props.product.gallery[this.state.galleryIndex]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
