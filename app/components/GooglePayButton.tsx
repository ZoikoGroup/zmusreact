"use client";

import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function GooglePayButton() {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest, setPaymentRequest] = useState<any>(null);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Sample Product",
        amount: 1999,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe]);

  if (!paymentRequest) return null;

  return (
    <div className="w-full flex justify-center mt-4">
      <PaymentRequestButtonElement
        options={{ paymentRequest, style: { paymentRequestButton: { theme: "dark", height: "48px" } }}}
      />
    </div>
  );
}
