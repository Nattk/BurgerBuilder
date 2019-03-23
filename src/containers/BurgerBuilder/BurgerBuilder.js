import React, { Component } from "react";

import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/actions/index";
import axios from "../../axios-orders";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ing
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.err ? <p>Ingredients not loading</p> : <Spinner />;

    if (this.props.ing) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          price={this.props.tPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.addIngredients}
            ingredientRemoved={this.props.deleteIngredients}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ing)}
            price={this.props.tPrice}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    tPrice: state.burger.totalPrice,
    err: state.burger.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredients: ingredientType =>
      dispatch(actionCreators.addIngredient(ingredientType)),
    deleteIngredients: ingredientType =>
      dispatch(actionCreators.removeIngredient(ingredientType)),
    onInitIngredients: () => dispatch(actionCreators.initIngrdients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirect(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
