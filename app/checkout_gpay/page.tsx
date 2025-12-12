"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import GooglePayButton from "../components/GooglePayButton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutGpay() {
  return (
    <Elements stripe={stripePromise}>
      <div className="p-10">
        <h2 className="text-2xl font-bold">Google Pay Checkout</h2>
        <GooglePayButton />
      </div>
    </Elements>
  );
}
