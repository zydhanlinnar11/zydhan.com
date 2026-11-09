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
	// Route id, not page.url.pathname: pathname is base-prefixed when paths.base
	// is set (GH Pages previews), which would mint dead '/id/base/…' hrefs.
	const href = $derived(counterpartHref(page.route.id ?? '/', page.params));
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href comes from counterpartHref(), which already runs resolve() -->
<a class="lang-toggle" {href} data-lang={target} aria-label={aria}></a>

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
		/* The code is decorative pseudo-content: the accessible name alone
		   carries the meaning, and visible text can't mismatch it (axe
		   label-content-name-mismatch). */
		font: 600 13px Inter, system-ui, sans-serif;
		letter-spacing: 0.02em;
		cursor: pointer;
		transition: background-color 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 180ms var(--ease-out);
	}

	.lang-toggle::before {
		content: attr(data-lang);
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
