<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import LayoutDefault from '$lib/components/templates/LayoutDefault.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let settingsStore;
	$: storeLoaded = false;

	onMount(async () => {
		// settingsStore = await getSettingsStore();
		storeLoaded = true;
	});
</script>

<div class="fixed flex flex-col items-end w-full h-full bg-black/50">
	<LayoutDefault withHeader={true} withPadding={false}>
		<div class="mx-5 sm:mx-12">
			<h1 class="text-title1 mb-4">OSB Hotels</h1>
			<ul class="list-disc">
				{#each data?.apiKeys || [] as apiKey (apiKey.value)}
					<li>
						<a
							class="hover:underline"
							href={`/${apiKey.type === 'chain' ? 'chain/' : ''}${apiKey.value}`}
						>
							Go to {apiKey.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</LayoutDefault>
</div>

<style>
	html {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		-webkit-text-size-adjust: 100%;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	strong,
	b {
		font-weight: 700;
	}

	body {
		margin: 0;
		color: rgba(0, 0, 0, 0.87);
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5;
		letter-spacing: 0.00938em;
		background-color: #fff;
	}

	@media print {
		body {
			background-color: #fff;
		}
	}

	body::backdrop {
		background-color: #fff;
	}
</style>
