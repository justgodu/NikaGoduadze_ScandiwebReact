import { Interweave } from "interweave";
import React, { Component } from "react";
import AddToCartButton from "../../components/Product/AddToCartButton/AddToCartButton";
import BrandTitle from "../../components/Product/BrandTitle/BrandTitle";
import ProductAttributes from "../../components/Product/ProductAttributes/ProductAttributes";
import ProductPrice from "../../components/Product/ProductPrice/ProductPrice";
import ProductTitle from "../../components/Product/ProductTitle/ProductTitle";
import withHooks from "../../components/Wrapper/Wrapper";
import getProduct from "../../queries/GetProduct";
import "./ProductPage.css";
class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      selectedImageIndex: 0,
      selectedAttributes: {},
      canAddToCart: false,
      cartObject: {
        id: this.props.params.id,
      },
    };

    this.onAttributeSelect = this.onAttributeSelect.bind(this);
    this.selectActiveImage = this.selectActiveImage.bind(this);
  }

  async componentDidMount() {
    let product = await getProduct(this.props.params.id);

    // If product has no attributes it should be possible to add it into cart
    let canAddToCart = false;
    if (!product.product.attributes || !product.product.attributes.length) {
      canAddToCart = true;
    }
    this.setState({ product: product.product, canAddToCart: canAddToCart });
  }

  /**
   * Change index of main image in gallery
   * @param index
   */
  selectActiveImage(index) {
    this.setState({ selectedImageIndex: index });
  }

  /**
   * Update selected product attriubtes state
   * @param {string} key
   * @param {any} value
   */
  onAttributeSelect(key, value) {
    const newValue = {};
    newValue[key] = value;

    const newSelectedAttributes = Object.assign(
      this.state.selectedAttributes,
      newValue
    );

    let canAddToCart = true;

    // If any of the product attributes are not selected
    // set canAddToCart to false
    if (this.state.product.attributes) {
      for (const attribute of this.state.product.attributes) {
        if (!newSelectedAttributes[attribute.id]) {
          canAddToCart = false;
        }
      }
    }

    const newCartObject = Object.assign(
      this.state.cartObject,
      newSelectedAttributes
    );

    this.setState({
      selectedAttributes: newSelectedAttributes,
      canAddToCart,
      cartObject: newCartObject,
    });
  }
  render() {
    const displayIfOutOfStock = this.state.product.inStock
      ? { display: "none" }
      : { display: "block" };
    const productImageClass = `main-image ${
      this.state.product.inStock ? "" : "not-in-stock"
    }`;

    const descriptionStyle = { fontSize: "16px" };
    return (
      <div className="single-product-container container">
        <div className="product-images-container">
          <div className="image-list">
            {this.state.product.gallery
              ? this.state.product.gallery.map((src, index) => (
                  <img
                    src={src}
                    key={index}
                    onClick={() => this.selectActiveImage(index)}
                    alt={`${this.state.product.name} ${index}`}
                  ></img>
                ))
              : ""}
          </div>
          <div className="main-image-container">
            <img
              className={productImageClass}
              src={
                this.state.product.gallery
                  ? this.state.product.gallery[this.state.selectedImageIndex]
                  : ""
              }
              alt={this.state.product.name}
            ></img>
            <div style={displayIfOutOfStock} className="out-of-stock-cover">
              OUT OF STOCK
            </div>
          </div>
        </div>
        <div className="product-info-container">
          <div className="product-title-container">
            <BrandTitle
              fontSize="30px"
              title={this.state.product.brand}
            ></BrandTitle>
            <ProductTitle
              fontSize="30px"
              title={this.state.product.name}
            ></ProductTitle>
          </div>
          <ProductAttributes
            fontSize="18px"
            attributes={this.state.product.attributes}
            onAttributeSelect={this.onAttributeSelect}
            selectedAttributes={this.state.selectedAttributes}
          ></ProductAttributes>
          <ProductPrice prices={this.state.product.prices}></ProductPrice>
          {this.state.product.inStock && (
            <AddToCartButton
              canAddToCart={this.state.canAddToCart}
              cartObject={this.state.cartObject}
            ></AddToCartButton>
          )}
          <div
            style={descriptionStyle}
          >
            <Interweave content={this.state.product.description}/>
          </div>
        </div>
      </div>
    );
  }
}
export default withHooks(ProductPage);
