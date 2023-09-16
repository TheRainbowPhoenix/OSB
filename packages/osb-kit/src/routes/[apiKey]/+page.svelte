<script lang="ts">
	import WidgetWrapper from '$lib/components/WidgetWrapper.svelte';
	import type { PageData } from './$types';

	export let data: PageData = {};
</script>

<!-- <heapAnalyticsId /> -->
<!-- <ThemeProvider> -->
<!-- <CssBaseLine /> -->
<!-- <SpreedlyProvider> -->
<WidgetWrapper />
<!-- <SpreedlyProvider /> -->
<!-- </ThemeProvider> -->

<h1>{data?.title || 'title TODO'}</h1>
