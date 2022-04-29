import { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { CartProvider } from "./contexts/CartContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import getCategories from "./queries/GetCategories";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const { categories } = await getCategories();

    const names = categories.map((category) => {
      return category.name;
    });
    this.setState({ categories: names });
  }

  render() {
    return (
      <div className="App">
        <CurrencyProvider>
          <CartProvider>
            <Header></Header>
            <main id="main">
              <Routes>
                {this.state.categories && this.state.categories.length ? (
                  <Route
                    exact
                    path="/"
                    element={<Navigate to={`/${this.state.categories[0]}`} />}
                  ></Route>
                ) : (
                  ""
                )}

                <Route
                  path="/:id"
                  element={<CategoryPage></CategoryPage>}
                ></Route>
                <Route
                  path="product/:id"
                  element={<ProductPage></ProductPage>}
                ></Route>
                <Route
                  path="cart"
                  element={<CartPage></CartPage>}
                ></Route>
              </Routes>
            </main>
          </CartProvider>
        </CurrencyProvider>
      </div>
    );
  }
}
