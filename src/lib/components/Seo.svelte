<script lang="ts">
	import { links } from '#lib/links';
	import type { Lang } from '#lib/content';
	import { swapLangPath } from '#lib/i18n';
	import { uiCopy } from '#lib/ui-copy';

	type Props = {
		title: string;
		description: string;
		path: string;
		lang: Lang;
		image?: string;
		imageAlt?: string;
	};

	let {
		title,
		description,
		path,
		lang,
		image = `${links.domain}/og.png`,
		imageAlt = uiCopy[lang].seo.imageAlt
	}: Props = $props();

	function alternatesFor(path: string): { en: string; id: string } {
		const hash = path.indexOf('#');
		const pure = hash === -1 ? path : path.slice(0, hash);
		const suffix = hash === -1 ? '' : path.slice(hash);
		const swapped = swapLangPath(pure);
		// The URL itself decides which language each alternate points at,
		// independent of the page copy (og:locale comes from the `lang` prop).
		const isId = /^\/id(?:\/|$)/.test(pure) || pure === '/id';
		const en = isId ? swapped : pure;
		const id = isId ? pure : swapped;
		return { en: `${links.domain}${en}${suffix}`, id: `${links.domain}${id}${suffix}` };
	}

	const canonical = $derived(`${links.domain}${path}`);
	const alternates = $derived(alternatesFor(path));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="en" href={alternates.en} />
	<link rel="alternate" hreflang="id" href={alternates.id} />
	<link rel="alternate" hreflang="x-default" href={alternates.en} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content="Zydhan Linnar Putra" />
	<meta property="og:locale" content={lang === 'id' ? 'id_ID' : 'en_US'} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
