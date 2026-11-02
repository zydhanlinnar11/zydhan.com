<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RedirectTarget } from '#lib/redirects';

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
	<link rel="canonical" href={`https://zydhan.com${to}`} />
</svelte:head>
<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is already passed through resolve() in hrefFor -->
<p>Memindahkan ke <a href={href}>{to}</a>…</p>
