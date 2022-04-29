import React, { Component } from "react";

const CartContext = React.createContext();
export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.editItem = this.editItem.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
    
    this.state = {
      items: [],
    };
  }

  componentDidMount(){
    let savedItems = localStorage.getItem("cart");
    if(savedItems && savedItems.length)
    this.setState({items: JSON.parse(savedItems) })
  }
  editItem(item, action) {
    let alreadyInCart = false;
    let newItems = [];
    
    for (const cartItem of this.state.items) {      
      if (cartItem.id === item.id) {
        let sameAttributes = true;
        for (const [key, value] of Object.entries(item)) {
          if (key === "id" || key === "qty") continue;
           if (cartItem[key] !== value) {
            sameAttributes = false;
            break;
          }
        }
        
        if(sameAttributes){
          if(action === "add"){
            cartItem.qty++;
            alreadyInCart = true;
            newItems.push(cartItem);
          }else if(action === "substract"){
            cartItem.qty--;
            if(cartItem.qty > 0){
              newItems.push(cartItem);
            }
          }
          alreadyInCart = true;
        }else{
          newItems.push(cartItem);
        }
      }else{
        newItems.push(cartItem);
      }
    }
    if(!alreadyInCart && action === "add"){
      item.qty = 1;
      newItems.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(newItems));
    this.setState({ items: newItems });
  }

  emptyCart(){
    localStorage.setItem("cart", JSON.stringify([]));
    this.setState({items: []})
  }

  render() {
    const { items } = this.state;
    const { editItem, emptyCart } = this;
    return (
      <CartContext.Provider
        value={{
          items,
          editItem,
          emptyCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
