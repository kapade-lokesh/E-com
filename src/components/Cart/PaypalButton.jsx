import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    // <PayPalScriptProvider
    //   options={{
    //     "client-id":
    //       "ARxRl__UW1AhXSuxT8q5tSqrCB5KSLVGJEh6nYecXz3tj6Xth2BXZh4SdF4mzrDB2PJ3AC5ExThqMjAk",
    //     currency: "INR", // Set currency globally
    //   }}
    // >
    //   {/* <PayPalButtons
    //     style={{ layout: "vertical" }}
    //     createOrder={(data, actions) => {
    //       return actions.order.create({
    //         purchase_units: [{ amount: { value: amount } }],
    //       });
    //     }}
    //     onApprove={(data, actions) => {
    //       return actions.order.capture().then(onSuccess);
    //     }}
    //     onError={onError}
    //   /> */}

    //   <PayPalButtons
    //     style={{ layout: "vertical" }}
    //     createOrder={(data, actions) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           { amount: { currency_code: "INR", value: "10.00" } },
    //         ],
    //       });
    //     }}
    //     onApprove={(data, actions) => {
    //       return actions.order.capture().then((details) => {
    //         alert("Transaction completed by " + details.payer.name.given_name);
    //       });
    //     }}
    //     onError={(err) => {
    //       console.error("Error: ", err);
    //       alert("Something went wrong. Please try again later.");
    //     }}
    //   />
    // </PayPalScriptProvider>

    <PayPalScriptProvider
      options={{
        components: "buttons",
        "client-id":
          "ARxRl__UW1AhXSuxT8q5tSqrCB5KSLVGJEh6nYecXz3tj6Xth2BXZh4SdF4mzrDB2PJ3AC5ExThqMjAk",
        currency: "USD", // Set currency globally
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              { amount: { currency_code: "USD", value: amount } },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("success");
            if (onSuccess) onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("Error: ", err);
          if (onError) onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
