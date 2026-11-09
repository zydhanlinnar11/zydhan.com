<script lang="ts">
	import { page } from '$app/state';
	import type { Lang } from '#lib/content';
	import { langFromRouteId } from '#lib/i18n';
	import { counterpartHref } from '#lib/lang-nav';
	import { uiCopy } from '#lib/ui-copy';

	// Label = the language you switch TO.
	const other = $derived<Lang>(langFromRouteId(page.route.id ?? '/') === 'id' ? 'en' : 'id');
	const target = $derived(other === 'en' ? 'EN' : 'ID');
	const aria = $derived(uiCopy[other].topBar.switchLangAria);
	const href = $derived(counterpartHref(page.url.pathname));
</script>

<a class="lang-toggle" {href} aria-label={aria}>{target}</a>

<style>
	.lang-toggle {
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
		text-decoration: none;
		font: 600 13px Inter, system-ui, sans-serif;
		letter-spacing: 0.02em;
		cursor: pointer;
		transition: background-color 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 180ms var(--ease-out);
	}

	@media (hover: hover) {
		.lang-toggle:hover {
			background: var(--chiphover);
			border-color: var(--accent);
		}
	}

	.lang-toggle:active {
		transform: scale(0.96);
		transition-duration: 80ms;
	}
</style>
