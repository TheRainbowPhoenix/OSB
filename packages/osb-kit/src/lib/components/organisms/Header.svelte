<script lang="ts">
	import IconButton from '../atoms/IconButton.svelte';
	import HamburgerIcon from '../atoms/icons/HamburgerIcon.svelte';
	import MdCloseIcon from '../atoms/icons/MdCloseIcon.svelte';

	import { page } from '$app/stores';

	const entity = ($page?.url.pathname || '').includes('chain') ? 'chain' : 'hotel';

	// const chainLogoUrl = cdnUrl ? `${cdnUrl}/assets/chain/${hotelChainCode}` : null;

	// const hotelLogoUrl =
	// 	cdnUrl && hotelProvider && hotelCode
	// 		? `${cdnUrl}/assets/hotel/${hotelProvider}/${hotelChainCode}/${hotelCode}`
	// 		: null;

	// const logoUrl = entity === 'chain' ? chainLogoUrl : hotelLogoUrl;
	const logoUrl = '/favicon.png';

	const handleMenuClick = () => {};
	const handleCloseWidget = () => {};
	const handleImageError = () => {
		hasImageError = true;
	};

	let hasImageError = false;
</script>

<header
	class="h-12 items-center relative flex justify-between mx-5 mt-5 mb-1 bg-hotel-background z-10 sm:px-7"
>
	<IconButton on:click={handleMenuClick} rounded={false}>
		<HamburgerIcon size={24} />
	</IconButton>

	{#if logoUrl && !hasImageError}
		<div class="relative w-full h-full">
			<img
				width="48px"
				src={logoUrl}
				alt="Hotel Logo"
				on:error={handleImageError}
				class="m-auto object-contain"
			/>
		</div>
	{/if}
	<IconButton on:click={handleCloseWidget}>
		<MdCloseIcon size={24} />
	</IconButton>
</header>
