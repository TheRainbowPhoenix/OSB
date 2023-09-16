<script>
	import { hotelStore } from '$store/hotel';
	import '../styles/global.css';
</script>

<svelte:head>
	<title>OSB</title>
	<meta name="viewport" content="initial-scale=1, width=device-width" />
</svelte:head>

{#if $hotelStore.hotelScripts}
	{#each $hotelStore.hotelScripts as script, idx}
		<script
			id={$hotelStore.hotelCode + idx}
			src={script.src}
			async={script.attribute === 'async'}
			defer={script.attribute === 'defer'}
		></script>
	{/each}
{/if}

<noscript>
	<!-- TODO: iframe GTM -->
</noscript>

<slot />
