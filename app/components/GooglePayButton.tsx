"use client";
import { useEffect, useState } from "react";
import { loadStripe, PaymentRequest } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function GooglePayButton({ amount }) {
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    async function init() {
      const stripe = await stripePromise;

      if (!stripe) return;

      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Order Amount",
          amount: amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      const canPay = await pr.canMakePayment();

      // 🔥 ADD THIS LOG HERE
      console.log("canMakePayment result =>", canPay);

      if (canPay && canPay.googlePay) {
        setPaymentRequest(pr);
      } else {
        console.log("Google Pay not supported:", canPay);
      }
    }

    init();
  }, [amount]);

  if (!paymentRequest) {
    return (
      <p className="text-red-500 text-sm">
        Google Pay not available on this device.
      </p>
    );
  }

  return (
    <button
      onClick={() => console.log("Payment button clicked")}
      className="bg-black text-white p-3 rounded-lg"
    >
      Pay with Google Pay
    </button>
  );
}
