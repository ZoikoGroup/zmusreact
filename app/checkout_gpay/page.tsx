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

  // 🔁 Dynamic values (can come from props, URL, plan selection, etc.)
  const amount = 1999; // $19.99 in cents
  const currency = "usd";

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  if (!clientSecret) return <p>Loading payment form…</p>;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <div className="p-10 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Pay ${amount / 100}
        </h2>
        <StripePaymentForm />
      </div>
    </Elements>
  );
}
