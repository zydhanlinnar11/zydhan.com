<script lang="ts">
	import type { Lang } from '#lib/content';
	import { toggleTheme } from '#lib/theme';
	import { uiCopy } from '#lib/ui-copy';
	import Icon from './Icon.svelte';

	let { lang }: { lang: Lang } = $props();
</script>

<button
	type="button"
	class="theme-toggle"
	aria-label={uiCopy[lang].themeToggle.aria}
	onclick={() => toggleTheme()}
>
	<Icon name="moon" />
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		min-width: 44px;
		min-height: 44px;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--chip);
		color: var(--text);
		cursor: pointer;
		transition: background-color 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 180ms var(--ease-out);
	}

	@media (hover: hover) {
		.theme-toggle:hover {
			background: var(--chiphover);
			border-color: var(--accent);
		}
	}

	.theme-toggle:active {
		transform: scale(0.96);
		transition-duration: 80ms;
	}
</style>
