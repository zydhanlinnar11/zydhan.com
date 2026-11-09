<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { RedirectTarget } from '#lib/redirects';
	import Seo from '#lib/components/Seo.svelte';
	import { langFromRouteId } from '#lib/i18n';
	import { uiCopy } from '#lib/ui-copy';

	let { to }: { to: RedirectTarget } = $props();

	const lang = $derived(langFromRouteId(page.route.id ?? '/'));
	const copy = $derived(uiCopy[lang].redirectPage);

	function hrefFor(target: RedirectTarget): string {
		const hash = target.indexOf('#');
		// slice() widens to string; cast back so the switch is exhaustive.
		const pure = (hash === -1 ? target : target.slice(0, hash)) as '/' | '/cv' | '/id' | '/id/cv';
		const suffix = hash === -1 ? '' : `#${target.slice(hash + 1)}`;
		switch (pure) {
			case '/':
				return resolve('/') + suffix;
			case '/cv':
				return resolve('/cv') + suffix;
			case '/id':
				return resolve('/id') + suffix;
			case '/id/cv':
				// The '/id/cv' route arrives with Task 4 (page wrapper refactor);
				// drop this directive once `svelte-kit sync` has seen it.
				// @ts-expect-error '/id/cv' is not in RouteId yet
				return resolve('/id/cv') + suffix;
		}
	}

	const href = $derived(hrefFor(to));
</script>

<svelte:head>
	<meta http-equiv="refresh" content={`0; url=${href}`} />
</svelte:head>
<Seo
	title="Zydhan Linnar Putra"
	description={lang === 'id' ? 'Backend engineer di Surabaya.' : 'Backend engineer in Surabaya.'}
	path={to}
	{lang}
/>
<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is already passed through resolve() in hrefFor -->
<p>{copy.to} <a href={href}>{to}</a>…</p>
<p>{copy.manual}</p>
