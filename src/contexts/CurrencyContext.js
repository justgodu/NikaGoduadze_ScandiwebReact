import React, { Component } from "react";
import getCurrencies from "../queries/GetCurrencies";

const CurrencyContext = React.createContext();
export class CurrencyProvider extends Component {
  async componentDidMount() {
    let currencies = await getCurrencies();
    this.setState({
      currencySymbol: currencies.currencies[0].symbol,
      availableCurrencies: currencies.currencies,
    });

    this.setCurrency = this.setCurrency.bind(this);
  }
  state = {
    currencyIndex: 0,
    currencySymbol: "",
    availableCurrencies: [],
  };

  setCurrency(index) {
    this.setState({
      currencyIndex: index,
      currencySymbol: this.state.availableCurrencies[index].symbol,
    });
  }

  render() {
    const { currencyIndex, currencySymbol, availableCurrencies } = this.state;
    const { setCurrency } = this;
    return (
      <CurrencyContext.Provider
        value={{
          currencyIndex,
          currencySymbol,
          availableCurrencies,
          setCurrency,
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
