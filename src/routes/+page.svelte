<script lang="ts">
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { loadStripe } from '@stripe/stripe-js';

	const SUBSCRIPTION_PRICE_ID = 'price_1QCg9zGALH1mrUSjZZ3No1OV';
	const LIFETIME_ACCESS_PRICE_ID = 'price_1QCg9pGALH1mrUSjuIBIPDpV';

	async function onclick(isSubscription: boolean) {
		const stripe = await loadStripe(PUBLIC_STRIPE_KEY);

		const response = await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				priceId: isSubscription ? SUBSCRIPTION_PRICE_ID : LIFETIME_ACCESS_PRICE_ID,
				mode: isSubscription ? 'subscription' : 'payment'
			})
		});

		const { sessionId } = await response.json();
		await stripe?.redirectToCheckout({ sessionId });
	}
</script>

<main>
	<button onclick={() => onclick(false)} class="cta"> Get lifetime access </button>
	<button onclick={() => onclick(true)} class="cta"> Get monthly subscription </button>
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button {
		width: 300px;
		height: 50px;
		color: white;
		background-color: black;
		cursor: pointer;
	}
</style>
