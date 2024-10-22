import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { PUBLIC_FRONTEND_URL } from '$env/static/public';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ request }) {
	const { priceId, mode } = await request.json();
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		mode,
		success_url: `${PUBLIC_FRONTEND_URL}/checkout/success`,
		cancel_url: `${PUBLIC_FRONTEND_URL}/checkout/failure`
	});

	return json({ sessionId: session.id });
}
