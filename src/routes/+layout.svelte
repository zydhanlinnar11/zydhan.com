<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import TopBar from '#lib/components/TopBar.svelte';
	import MobileMenu from '#lib/components/MobileMenu.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import FloatingBar from '#lib/components/FloatingBar.svelte';
	import { langFromRouteId } from '#lib/i18n';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Keep <html lang> in sync across client-side navigations: the prerendered
	// HTML carries the right lang per route, but a soft navigation ('/' ↔ '/id')
	// would otherwise leave the stale document lang behind, so screen readers
	// keep pronouncing the new page's copy in the old language. Effects only run
	// in the browser, and reading page.route.id re-runs this on every
	// navigation. (Mirrors the per-route derivation the rest of the chrome uses.)
	$effect(() => {
		document.documentElement.lang = langFromRouteId(page.route.id ?? '/');
	});
</script>

<div class="shell">
	<div class="mesh global-mesh" aria-hidden="true"></div>
	<TopBar />
	<MobileMenu />
	<main>{@render children()}</main>
	<Footer />
</div>
<FloatingBar />

<style>
	.shell {
		position: relative;
		isolation: isolate;
	}

	.global-mesh {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 760px;
		z-index: -1;
		pointer-events: none;
		-webkit-mask-image: linear-gradient(#000 62%, transparent);
		mask-image: linear-gradient(#000 62%, transparent);
	}

	@media (min-width: 768px) {
		.global-mesh {
			height: 900px;
		}
	}
</style>
