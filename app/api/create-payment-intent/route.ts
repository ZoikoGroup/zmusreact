import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY missing");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: "usd",

      // Card + Google Pay + Apple Pay
      payment_method_types: ["card"],

      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
