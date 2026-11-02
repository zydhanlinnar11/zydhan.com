<script lang="ts">
	import type { PageProps } from './$types';
	import Redirect from '#lib/components/Redirect.svelte';

	let { data }: PageProps = $props();
</script>

<Redirect to={data.to} />
