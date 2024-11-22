import { useState } from "react";
import { useSelector } from "react-redux";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { PaymentFormContainer, FormContainer,PaymentButton } from "./payment-form.styles";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const totalAmount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalAmount: totalAmount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest User",
        },
      },
    });

    setIsProcessing(false);

    if (paymentResult.error) {
      console.log(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          disabled={isProcessing}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
