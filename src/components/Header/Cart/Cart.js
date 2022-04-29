import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../contexts/CartContext";
import CurrencyContext from "../../../contexts/CurrencyContext";
import getProduct from "../../../queries/GetProduct";
import Overflow from "../../Overflow/Overflow";
import "./Cart.css";
import CartItemCard from "./CartItemCard/CartItemCard";
export default class Cart extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      total: 0,
      products: [],
    };

    this.cartRef = React.createRef();
    this.toggleShowCurrencies = this.toggleShowCurrencies.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    const { items } = this.context;
    let products = [];
    for (const item of items) {
      products.push((await getProduct(item.id)).product);
    }
    this.setState({ products });

    document.addEventListener("mousedown", this.onClick);
  }

  async componentDidUpdate() {
    const { items } = this.context;
    if (this.state.products.length !== items.length) {
      let products = [];
      for (const item of items) {
        products.push((await getProduct(item.id)).product);
      }
      this.setState({ products });
    }
  }
  toggleShowCurrencies() {
    this.setState({ open: !this.state.open });
  }

  onClick(event) {
    if (
      this.cartRef &&
      this.cartRef.current &&
      !this.cartRef.current.contains(event.target)
    ) {
      this.setState({ open: false });
    }
  }

  getCartCount(items) {
    let count = 0;
    for (const item of items) {
      count += item.qty;
    }
    return count;
  }

  getCartTotal(currencyIndex) {
    const { items } = this.context;
    if (!this.state.products || this.state.products.length !== items.length) {
      return 0;
    }
    let total = 0;
    for (const i in items) {
      total +=
        this.state.products[i].prices[currencyIndex].amount * items[i].qty;
    }
    //Fix js error and return total
    return Number(Number.parseFloat(total).toFixed(2));
  }

  render() {
    const { items, editItem, emptyCart } = this.context;
    const count = this.getCartCount(items);
    return (
      <div className="cart-icon-container" ref={this.cartRef}>
        <div className="cart-icon" onClick={this.toggleShowCurrencies}>
          <div style={{display: count ? "block" : "none"}} className="cart-length">{count}</div>
          <img src="/cart.svg"></img>
        </div>
        <div
          className={
            "cart-content-container" + (this.state.open ? " active" : "")
          }
        >
          <div className="cart-title">
            <h4 className="cart-title">
              My Bag,<span> {count} items</span>
            </h4>
          </div>

          <div className="cart-items-container">
            <CurrencyContext.Consumer>
              {(currency) => {
                return items.map((item, index) => (
                  <CartItemCard
                    item={item}
                    key={index}
                    editItem={editItem}
                    currency={currency}
                    product={this.state.products[index]}
                  ></CartItemCard>
                ));
              }}
            </CurrencyContext.Consumer>
          </div>

          <div className="cart-total-container">
            <h4>Total</h4>
            <CurrencyContext.Consumer>
              {({ currencySymbol, currencyIndex }) => (
                <h4>
                  {currencySymbol} {this.getCartTotal(currencyIndex)}
                </h4>
              )}
            </CurrencyContext.Consumer>
          </div>
          <div className="cart-buttons-container">
            <Link to="/cart">
              <button className="view-bag-button">VIEW BAG</button>
            </Link>

            <button onClick={emptyCart} className="checkout-button">
              CHECK OUT
            </button>
          </div>
        </div>

        <Overflow>
          <div
            className="overflow"
            style={{ display: this.state.open ? "block" : "none" }}
          ></div>
        </Overflow>
      </div>
    );
  }
}
