import React, { Component } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./CartPage.css";
import CartContext from "../../contexts/CartContext";
import getProduct from "../../queries/GetProduct";
import CurrencyContext from "../../contexts/CurrencyContext";
import CartPageItemCard from "../../components/Header/Cart/CartPageItemCard/CartPageItemCard";
export default class CartPage extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      products: [],
    };
    this.getCartCount = this.getCartCount.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
  }

  async componentDidMount() {
    const { items } = this.context;
    let products = [];
    for (const item of items) {
      products.push((await getProduct(item.id)).product);
    }
    this.setState({ products });
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
    // Fix js error and return total
    return Number(Number.parseFloat(total).toFixed(2));
  }

  getTax(total) {
    return Number(Number.parseFloat((total / 100) * 10).toFixed(2));
  }

  render() {
    const { items, editItem, emptyCart } = this.context;
    const count = this.getCartCount(items);

    return (
      <div className="container cart-page">
        <PageHeader title="Cart"></PageHeader>


        <CurrencyContext.Consumer>
              {(currency) => {
                return items.map((item, index) => (
                  <CartPageItemCard
                    item={item}
                    key={index}
                    editItem={editItem}
                    currency={currency}
                    product={this.state.products[index]}
                  ></CartPageItemCard>
                ));
              }}
            </CurrencyContext.Consumer>
        <CurrencyContext.Consumer>
          
          {({ currencyIndex, currencySymbol }) => (
            <div className="cart-sumup-container">
              <h4 className="tax-text">
                Tax:{" "}
                <span>
                  {currencySymbol}
                  {this.getTax(this.getCartTotal(currencyIndex))}
                </span>
              </h4>
              <h4 className="qty-text">
                Qty: <span>{count}</span>
              </h4>
              <h4 className="total-text">
                Total:{" "}
                <span>
                  {currencySymbol}
                  {this.getCartTotal(currencyIndex)}
                </span>
              </h4>

              <button onClick={emptyCart} className="checkout-button">
                ORDER
              </button>
            </div>
            
          )}
        </CurrencyContext.Consumer>
      </div>
    );
  }
}
