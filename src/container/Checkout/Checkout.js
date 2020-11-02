import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack(); //goes back to the last page
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad','1]
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }

      this.setState({ ingredients: ingredients, totalPrice: price });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <CheckoutSummary
          ingredient={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredient={this.state.ingredients}
              price={this.state.totalPrice.toFixed(2)}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
