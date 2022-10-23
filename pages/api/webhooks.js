import axios from 'axios';
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API, {
	apiVersion: '2022-08-01',
});
const webhookSecret = process.env.STRIPE_WEBHOOK;

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];

		let event;

		try {
			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log(event);
			if (event.type === 'charge.succeeded') {
				const charge = event.data.object;
				// Handle successful charge
			} else {
				console.warn(`Unhandled event type: ${event.type}`);
			}
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		res.json({ received: true });
		if (event.type === 'charge.succeeded') {
			const charge = event.data.object;
			// Handle successful charge
		} else {
			console.warn(`Unhandled event type: ${event.type}`);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
