"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { forwardRef, useImperativeHandle, useState } from "react";

export type StripePaymentFormRef = {
  submitPayment: () => Promise<void>;
};

const StripePaymentForm = forwardRef<StripePaymentFormRef>((_, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    async submitPayment() {
      if (!stripe || !elements) return;

      setLoading(true);
      try {
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
      } finally {
        setLoading(false);
      }
    },
  }));

  return (
    <div className="space-y-4">
      <PaymentElement />
      {/* <button disabled={!stripe || loading} className="w-full bg-black text-white py-3 rounded" > 
        {loading ? "Processing..." : "Pay"} </button> */}
    </div>
  );
});

StripePaymentForm.displayName = "StripePaymentForm";
export default StripePaymentForm;
