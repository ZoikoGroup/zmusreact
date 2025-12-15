"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import StripePaymentForm from "../components/StripePaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutGpay() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) return <p>Loading payment form…</p>;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <div className="p-10 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Secure Payment
        </h2>
        <StripePaymentForm />
      </div>
    </Elements>
  );
}
