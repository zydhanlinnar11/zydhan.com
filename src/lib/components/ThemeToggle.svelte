<script lang="ts">
	import { toggleTheme } from '$lib/theme';
	import Icon from './Icon.svelte';
</script>

<button type="button" class="theme-toggle" aria-label="Ganti tema" onclick={() => toggleTheme()}>
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
	}
</style>
