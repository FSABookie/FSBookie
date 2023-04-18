import axios from "axios";
import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API, {
  apiVersion: "2022-08-01",
});
const webhookSecret = process.env.STRIPE_WEBHOOK;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      if (event.type === "checkout.session.completed") {
        console.log("EVENT", event);
        const charge = event.data.object;
        // Handle successful charge
        console.log("CHARGE", charge);
        console.log("1", charge.amount_subtotal);
        console.log("2", charge.amount_subtotal.toString().slice(0, -2));
        console.log(
          "3",
          Number(charge.amount_subtotal.toString().slice(0, -2))
        );
        console.log(charge.customer_details.email);
        // const amount = Number(charge.amount_subtotal.slice(0, -2))
        // console.log('AMOUNT', amount)
        axios.put("https://fsabookie.com/api/users/deposit", {
          deposit: Number(charge.amount_subtotal.toString().slice(0, -2)),
          email: charge.customer_details.email,
        });
        // updateUserFunds(charge);
      } else {
        console.warn(`Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.json({ received: true });
    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      // Handle successful charge
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
