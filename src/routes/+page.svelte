<script>
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { loadStripe } from '@stripe/stripe-js';

	async function onclick() {
		const stripe = await loadStripe(PUBLIC_STRIPE_KEY);

		const response = fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ priceId: 'price_1QCg9pGALH1mrUSjuIBIPDpV' })
		});
	}
</script>

<main>
	<button {onclick} class="cta"> Purchase now! </button>
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
