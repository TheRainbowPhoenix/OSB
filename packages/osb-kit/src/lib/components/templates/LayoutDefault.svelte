<script lang="ts">
	import Header from '../organisms/Header.svelte';

	export let withHeader = true;
	export let withFooter = false;
	export let customHeader = false;
	export let mainProps = {};
	export let headerProps = {};
	export let footerProps = {};
	export let isLoading = false;
	export let showError = false;
	export let footer = null;
	export let withPadding = true;

	let ref: HTMLDivElement;
</script>

<div class="flex flex-col w-full h-full sm:mr-8 sm:w-[35.5rem] z-10">
	<!-- Ref is used by the SwipeableDrawer component -->
	<div
		class="overflow-hidden relative flex flex-col justify-between w-full h-full bg-hotel-background rounded sm:mt-8"
		bind:this={ref}
	>
		<!-- <ErrorHandler /> -->
		<div
			class={`overflow-y-auto scrollbar h-full ${withPadding ? 'px-4 sm:px-12' : ''}`}
			{...mainProps}
		>
			{#if withHeader}
				{#if customHeader}
					{@html customHeader}
				{:else}
					<Header {...headerProps} />
				{/if}
			{/if}

			{#if showError}
				<!-- <Error /> -->
			{:else}
				<slot />
			{/if}
		</div>

		{#if withFooter}
			<!-- <Footer
            footer={footer}
            handleNextPage={handleNextPage}
            {...footerProps}
          /> -->
		{/if}

		{#if isLoading}
			<!-- <Loader /> -->
		{/if}
	</div>

	<!-- <PoweredBy /> -->
</div>
