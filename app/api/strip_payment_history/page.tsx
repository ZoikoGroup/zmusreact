// import Stripe from "stripe";
// import { headers } from "next/headers";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = (await headers()).get("stripe-signature")!;

//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//   const event = stripe.webhooks.constructEvent(
//     body,
//     sig,
//     process.env.STRIPE_WEBHOOK_SECRET!
//   );

//   if (event.type === "payment_intent.succeeded") {
//     const intent = event.data.object as Stripe.PaymentIntent;
//     // ✅ mark order as paid
//   }

//   return new Response("OK");
// }
