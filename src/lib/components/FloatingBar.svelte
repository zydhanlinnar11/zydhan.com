<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { getContent, type Lang } from '#lib/content';
	import { langFromRouteId, langHref } from '#lib/i18n';
	import { mailtoFreelanceHref, uiCopy } from '#lib/ui-copy';
	import { ui } from '#lib/ui.svelte';
	import Icon from './Icon.svelte';

	const lang = $derived<Lang>(langFromRouteId(page.route.id ?? '/'));
	const copy = $derived(uiCopy[lang].floatingBar);

	const c = $derived(getContent(lang));

	const isCv = $derived(page.route.id === '/cv' || page.route.id === '/id/cv');

	const cvSections = $derived([
		{ id: 'ringkasan', label: c.sectionTitles.summary },
		{ id: 'pengalaman', label: c.sectionTitles.experience },
		{ id: 'keahlian', label: c.sectionTitles.skills },
		{ id: 'pendidikan', label: c.sectionTitles.education },
		{ id: 'tulisan', label: c.sectionTitles.writings }
	] as const);

	const homeSections = $derived([
		{ id: 'peran', label: c.sectionTitles.recentRoles },
		{ id: 'proyek', label: c.sectionTitles.featured },
		{ id: 'tulisan', label: c.sectionTitles.writings },
		{ id: 'kontak', label: copy.contactSection }
	] as const);

	const sections = $derived(isCv ? cvSections : homeSections);

	let visible = $state(false);
	let overlayOpen = $state(false);
	let overlayDialog = $state<HTMLDialogElement>();
	let closing = $state(false);
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	const activeId = $derived(isCv ? ui.cvActive : ui.homeActive);

	function link(href: string) {
		// Only page paths this site controls flow through here ('/', '/cv'), so a
		// narrow route type is safe and keeps resolve()'s overloads happy.
		type HostRoute = '/' | '/id' | '/cv' | '/id/cv';
		const pure = (href.indexOf('#') === -1 ? href : href.slice(0, href.indexOf('#'))) as HostRoute;
		const resolved = resolve(pure);
		return href.indexOf('#') === -1 ? resolved : resolved + href.slice(href.indexOf('#'));
	}

	function sectionHref(id: string) {
		return link(langHref(`${isCv ? '/cv' : '/'}#${id}`, lang));
	}

	// Re-find the page's trigger after client-side navigation: the layout persists,
	// so onMount alone would keep observing a detached Home trigger on /cv (and back).
	$effect(() => {
		void page.url.pathname;

		visible = false;
		overlayOpen = false;

		const trigger = document.querySelector('[data-floating-trigger]');
		if (!trigger) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				visible = !entry.isIntersecting;
				if (!visible) overlayOpen = false;
			},
			{ rootMargin: '0px' }
		);

		observer.observe(trigger);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (!overlayDialog) return;
		if (overlayOpen) {
			clearTimeout(closeTimer);
			closing = false;
			if (!overlayDialog.open) overlayDialog.show();
		} else if (overlayDialog.open && !closing) {
			closing = true;
			const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
			const dialog = overlayDialog;
			closeTimer = setTimeout(() => {
				dialog.close();
				closing = false;
			}, reduce ? 0 : 170);
		}
	});

	$effect(() => {
		const shell = document.querySelector('.shell');
		if (overlayOpen) {
			document.body.style.overflow = 'hidden';
			shell?.setAttribute('inert', '');
		} else {
			document.body.style.overflow = '';
			shell?.removeAttribute('inert');
		}
		return () => {
			document.body.style.overflow = '';
			shell?.removeAttribute('inert');
		};
	});
</script>

<nav
	class="floating-bar glass bar-glass bar"
	class:show={visible}
	aria-label={copy.quickAria}
	aria-hidden={visible ? undefined : 'true'}
	inert={!visible}
>
		<button
			type="button"
			class="nav"
			class:tint={overlayOpen}
			aria-expanded={overlayOpen}
			onclick={() => (overlayOpen = !overlayOpen)}
		>
			<span class="ico">
				<span class="m"><Icon name="menu" size={20} /></span>
				<span class="x"><Icon name="close" size={20} /></span>
			</span>
			<span>{overlayOpen ? copy.closeLabel : copy.navigation}</span>
		</button>
		{#if isCv}
			<button type="button" onclick={() => window.print()}>
				<Icon name="download" size={20} />
				<span>{copy.downloadPdf}</span>
			</button>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto links are external -->
			<a class="on" href={mailtoFreelanceHref(lang)}>
				<Icon name="mail" size={20} />
				<span>{copy.contact}</span>
			</a>
		{:else}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto links are external -->
			<a href={mailtoFreelanceHref(lang)}>
				<Icon name="mail" size={20} />
				<span>{copy.contact}</span>
			</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- link() passes the path through resolve() -->
			<a class="on" href={link(langHref('/cv', lang))}>
				<Icon name="file" size={20} />
				<span>{copy.viewCv}</span>
			</a>
		{/if}
</nav>

<div class="overlay-scrim" class:on={overlayOpen} aria-hidden="true" onclick={() => (overlayOpen = false)}></div>

<dialog
	bind:this={overlayDialog}
	class="glass ov-glass ov-glass-strong overlay no-print"
	class:closing
	aria-label={copy.overlayAria}
	onclose={() => (overlayOpen = false)}
>
	<span class="overlay-title">{copy.navigation}</span>
	<nav class="sections" aria-label={isCv ? copy.fillCv : copy.pageSections}>
		{#each sections as section, i (section.id)}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware; the rule cannot see through string concatenation -->
			<a class="item" style:--i={i} href={sectionHref(section.id)} aria-current={activeId === section.id ? 'location' : undefined} onclick={() => (overlayOpen = false)}>
				<span>{section.label}</span>
				{#if activeId === section.id}
					<Icon name="check" size={18} />
				{/if}
			</a>
		{/each}
	</nav>
</dialog>

<style>
	.floating-bar {
		position: fixed;
		left: 16px;
		right: 16px;
		bottom: 16px;
		z-index: 30;
		display: flex;
		gap: 4px;
		padding: 6px;
		border-radius: 999px;
		opacity: 0;
		visibility: hidden;
		transform: translateY(24px);
		transition:
			transform 220ms var(--ease-in),
			opacity 220ms var(--ease-in),
			visibility 0s linear 220ms;
	}

	.floating-bar.show {
		opacity: 1;
		visibility: visible;
		transform: none;
		transition:
			transform 320ms var(--ease-out),
			opacity 240ms var(--ease-out),
			visibility 0s;
	}

	.floating-bar button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3px;
		flex: 1 1 0;
		height: 60px;
		padding: 0 4px;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--text);
		font: 600 13px Inter, system-ui, sans-serif;
		box-sizing: border-box;
		cursor: pointer;
	}

	.floating-bar button.nav {
		transition:
			background-color 200ms var(--ease-out),
			color 200ms var(--ease-out),
			transform 180ms var(--ease-out);
	}

	.ico {
		position: relative;
		width: 20px;
		height: 20px;
	}

	.ico > span {
		position: absolute;
		inset: 0;
		transition:
			opacity 200ms var(--ease-out),
			transform 260ms var(--ease-out);
	}

	.ico .x {
		opacity: 0;
		transform: rotate(-90deg) scale(0.7);
	}

	.nav.tint .ico .m {
		opacity: 0;
		transform: rotate(90deg) scale(0.7);
	}

	.nav.tint .ico .x {
		opacity: 1;
		transform: none;
	}

	.floating-bar button.tint {
		background: var(--accenttint);
		color: var(--accent);
	}

	.overlay {
		position: fixed;
		top: auto;
		left: 16px;
		right: 16px;
		bottom: 100px;
		z-index: 26;
		width: auto;
		height: auto;
		max-width: none;
		max-height: none;
		overflow: visible;
		margin: 0;
		padding: 12px;
		border-radius: 22px;
		color: var(--text);
		box-sizing: border-box;
		transform-origin: 50% 100%;
		opacity: 1;
		transform: none;
		transition:
			opacity 240ms var(--ease-out),
			transform 320ms var(--ease-out);
	}

	@starting-style {
		.overlay[open] {
			opacity: 0;
			transform: translateY(12px) scale(0.97);
		}
	}

	.overlay.closing {
		opacity: 0;
		transform: translateY(12px) scale(0.97);
		transition:
			opacity 160ms var(--ease-in),
			transform 160ms var(--ease-in);
	}

	.overlay .item {
		opacity: 1;
		transform: none;
		transition:
			opacity 240ms var(--ease-out),
			transform 300ms var(--ease-out),
			background-color 180ms var(--ease-out),
			color 180ms var(--ease-out);
		transition-delay: calc(var(--i) * 30ms + 40ms), calc(var(--i) * 30ms + 40ms), 0s, 0s;
	}

	@starting-style {
		.overlay[open] .item {
			opacity: 0;
			transform: translateY(6px);
		}
	}

	.overlay.closing .item {
		opacity: 0;
		transition: opacity 120ms var(--ease-in);
		transition-delay: 0s;
	}

	.overlay-scrim {
		position: fixed;
		inset: 0;
		z-index: 25;
		background: var(--scrim);
		-webkit-backdrop-filter: blur(20px) saturate(160%);
		backdrop-filter: blur(20px) saturate(160%);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 160ms var(--ease-in),
			visibility 0s linear 160ms;
	}

	.overlay-scrim.on {
		opacity: 1;
		visibility: visible;
		transition:
			opacity 280ms var(--ease-out),
			visibility 0s;
	}

	@media (prefers-reduced-transparency: reduce) {
		.overlay-scrim {
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
	}

	@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
		.overlay-scrim {
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
	}

	.overlay:not([open]) {
		display: none;
	}

	.overlay-title {
		padding: 6px 14px 10px;
		font: 500 14px Inter, system-ui, sans-serif;
		color: var(--muted);
	}

	.sections {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.sections .item[aria-current='location'] {
		background: var(--accenttint);
		color: var(--accent);
	}

	@media (min-width: 768px) {
		.floating-bar {
			display: none;
		}
	}
</style>
