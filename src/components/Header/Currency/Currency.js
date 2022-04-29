import React, { Component } from "react";
import CurrencyContext from "../../../contexts/CurrencyContext";
import getCurrencies from "../../../queries/GetCurrencies";
import "./Currency.css";
export default class Currency extends Component {
  static contextType = CurrencyContext;
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.currencyRef = React.createRef();
    this.toggleShowCurrencies = this.toggleShowCurrencies.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggleShowCurrencies(){
      this.setState({open: !this.state.open});
  }

  changeCurrency(index){
    const {setCurrency} = this.context;
    setCurrency(index);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.onClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClick);
  }

  onClick(event) {
    if (this.currencyRef && !this.currencyRef.current.contains(event.target)) {
      this.setState({open: false});
    }
  }

  render() {
    const { currencySymbol, availableCurrencies } = this.context;
    return (
      <div ref={this.currencyRef} className="currencies-container">
        <div className="current-currency" onClick={this.toggleShowCurrencies}>
            <p>{currencySymbol}</p>
            <img className={this.state.open ? "arrow-up" : ""} alt="arrow" src="/arrow.svg"></img>
        </div>
        <div className={"curreny-list-container " + (this.state.open ? "active" : "")}>
          {availableCurrencies.map((currency, index) => (
            <div className="single-currency" onClick={()=>{this.changeCurrency(index)}} key={index}>
              <span>{currency.symbol}</span>
              <span> {currency.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
