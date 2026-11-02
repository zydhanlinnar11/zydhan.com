<script lang="ts">
	import '../app.css';
	import TopBar from '$lib/components/TopBar.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<TopBar />
<MobileMenu />
<main>{@render children()}</main>
<Footer />
