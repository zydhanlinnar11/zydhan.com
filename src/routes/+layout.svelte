<script lang="ts">
	import '../app.css';
	import TopBar from '#lib/components/TopBar.svelte';
	import MobileMenu from '#lib/components/MobileMenu.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import FloatingBar from '#lib/components/FloatingBar.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
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
