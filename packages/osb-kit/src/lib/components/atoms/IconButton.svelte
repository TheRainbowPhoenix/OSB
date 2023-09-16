<script lang="ts">
	export let rounded = true;
</script>

<button
	class={`transition-all hover:bg-hotel-primary/20 hover:shadow-[0_0_0.25rem_0.5rem] hover:shadow-hotel-primary/20 ` +
		(rounded ? 'rounded-full' : 'rounded-none')}
	on:click
>
	<slot />
</button>
