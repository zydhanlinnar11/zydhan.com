<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RedirectTarget } from '#lib/redirects';
	import Seo from '#lib/components/Seo.svelte';

	let { to }: { to: RedirectTarget } = $props();

	function hrefFor(target: RedirectTarget): string {
		const [path, hash] = target.split('#');
		const base = resolve(path as '/' | '/cv');
		return hash ? `${base}#${hash}` : base;
	}

	const href = $derived(hrefFor(to));
</script>

<svelte:head>
	<meta http-equiv="refresh" content={`0; url=${href}`} />
</svelte:head>
<Seo title="Zydhan Linnar Putra" description="Backend engineer di Surabaya." path={to} />
<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is already passed through resolve() in hrefFor -->
<p>Memindahkan ke <a href={href}>{to}</a>…</p>
