<script lang="ts">
	import { links } from '#lib/links';

	type Props = {
		title: string;
		description: string;
		path: string;
		image?: string;
		imageAlt?: string;
	};

	let {
		title,
		description,
		path,
		image = `${links.domain}/og.png`,
		imageAlt = 'Kartu profil Zydhan Linnar Putra dengan latar gradien dan tulisan backend engineer di Surabaya.'
	}: Props = $props();

	const canonical = $derived(`${links.domain}${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content="Zydhan Linnar Putra" />
	<meta property="og:locale" content="id_ID" />
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
