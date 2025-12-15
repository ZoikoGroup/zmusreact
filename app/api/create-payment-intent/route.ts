import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1999,
    currency: "usd",
    payment_method_types: ["card"],
    automatic_payment_methods: {
      enabled: true, // REQUIRED for GPay / ApplePay
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
