import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1999, // in cents
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
