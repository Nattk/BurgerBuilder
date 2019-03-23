import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-orders";

import Classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../../store/actions";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Fastest", display: "Fastest" },
            { value: "Cheapest", display: "Cheapest" }
          ]
        },
        value: "Fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ing,
      price: this.props.tPrice,
      userId: this.props.userId,
      orderData: formData
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputId) => {
    const updatedForm = updateObject(this.state.orderForm[inputId], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[inputId].validation
      ),
      touched: true
    });

    const updateForm = updateObject(this.state.orderForm, {
      [inputId]: updatedForm
    });
    let formIsValid = true;
    for (let inputIdentifier in updateForm) {
      formIsValid = updateForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updateForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            label={formElement.id}
            Value={formElement.config.value}
            elementConfig={formElement.config.elementConfig}
            elementType={formElement.config.elementType}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >
          Order
        </Button>
      </form>
    );
    if (this.props.load) {
      form = <Spinner />;
    }
    return (
      <div className={Classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    tPrice: state.burger.totalPrice,
    load: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
