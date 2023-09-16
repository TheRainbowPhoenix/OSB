<script lang="ts">
	import Widget from './organisms/Widget.svelte';

	let isMinimized = false;
	let hasBeenOpened = true;

	const minimizeWidget = () => {};
</script>

<!-- MinimizedButton -->
<div class="fixed flex flex-col items-end w-full h-full transition-all">
	<div
		class={`fixed w-full h-full bg-black/50 transition-opacity duration-500 ${
			isMinimized || !hasBeenOpened ? 'opacity-0' : 'opacity-100'
		}`}
		on:click={minimizeWidget}
		on:keydown={minimizeWidget}
		role="button"
		tabindex="-1"
	/>

	<div
		class={`flex flex-col items-end max-sm:w-full h-full transition-all duration-500 fixed ${
			isMinimized || !hasBeenOpened ? '-right-full' : 'right-0'
		}`}
	>
		<Widget />
		<!-- 
            <SnackbarProvider anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} bind:this={notistackRef}>
                <OverlayProvider>
                    <Widget />
                </OverlayProvider>
            </SnackbarProvider>        
        -->
	</div>
</div>
