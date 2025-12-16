"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { forwardRef, useImperativeHandle } from "react";

export type StripePaymentFormRef = {
  submitPayment: () => Promise<void>;
};

const StripePaymentForm = forwardRef<StripePaymentFormRef>((_, ref) => {
  const stripe = useStripe();
  const elements = useElements();

  useImperativeHandle(ref, () => ({
    async submitPayment() {
      if (!stripe || !elements) return;

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        alert(error.message);
        throw error;
      }
    },
  }));

  return (
    <div className="space-y-4">
      <PaymentElement />
    </div>
  );
});

StripePaymentForm.displayName = "StripePaymentForm";
export default StripePaymentForm;
