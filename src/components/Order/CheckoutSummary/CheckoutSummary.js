import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import Classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={Classes.CheckoutSummary}>
      <h1>We hope it tastes good!</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
