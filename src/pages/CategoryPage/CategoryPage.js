import React, { Component } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import getCategoryContent from "../../queries/GetCategoryContent";
import ProductList from "../../components/ProductList/ProductList";
import Header from "../../components/Header/Header";
import withHooks from "../../components/Wrapper/Wrapper";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: "",
        products: []
    }
  }

  async componentDidMount(){
    const categoryContent = (await getCategoryContent(this.props.params.id)).category;
    console.log("🚀 ~ file: CategoryPage.js ~ line 22 ~ CategoryPage ~ componentDidMount ~ categoryContent", categoryContent)
    
    this.setState({ title: categoryContent.name, products: categoryContent.products });
  }

  async componentDidUpdate(prevProps){
    if(this.props.params.id !== prevProps.params.id){
      const categoryContent = (await getCategoryContent(this.props.params.id)).category;
      console.log("🚀 ~ file: CategoryPage.js ~ line 22 ~ CategoryPage ~ componentDidMount ~ categoryContent", categoryContent)
      this.setState({ title: categoryContent.name, products: categoryContent.products });
    }
  }
  render() {
    return <div className="container">
        
        <PageHeader title={this.state.title}></PageHeader>
        <ProductList products={this.state.products}></ProductList>
    </div>
  }
}

export default withHooks(CategoryPage);
