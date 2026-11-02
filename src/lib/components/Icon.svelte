<script lang="ts">
	import { icons } from '#lib/icons';
	import type { IconName } from '#lib/icons';

	let { name, size = 18 }: { name: IconName; size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- icon paths are static, trusted literals -->
	{@html icons[name]}
</svg>
