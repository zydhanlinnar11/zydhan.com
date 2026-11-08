<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { getContent } from '#lib/content';
	import { links } from '#lib/links';
	import { ui } from '#lib/ui.svelte';
	import Icon from './Icon.svelte';

	const c = getContent('id');

	const sections = [
		{ id: 'ringkasan', label: c.sectionTitles.summary },
		{ id: 'pengalaman', label: c.sectionTitles.experience },
		{ id: 'keahlian', label: c.sectionTitles.skills },
		{ id: 'pendidikan', label: c.sectionTitles.education },
		{ id: 'tulisan', label: c.sectionTitles.writings }
	] as const;

	let visible = $state(false);
	let overlayOpen = $state(false);
	let overlayDialog = $state<HTMLDialogElement>();

	const isCv = $derived(page.route.id?.startsWith('/cv') ?? false);
	const navOpen = $derived(isCv ? overlayOpen : ui.menuOpen);
	const activeId = $derived(isCv ? ui.cvActive : sections[0].id);

	function sectionHref(id: string) {
		return resolve('/cv') + '#' + id;
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
		if (overlayOpen && !overlayDialog.open) {
			overlayDialog.show();
		} else if (!overlayOpen && overlayDialog.open) {
			overlayDialog.close();
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

{#if visible}
	<nav class="floating-bar glass bar-glass bar" aria-label="Aksi cepat">
		{#if isCv}
			<button
				type="button"
				class:tint={navOpen}
				aria-expanded={overlayOpen}
				onclick={() => (overlayOpen = !overlayOpen)}
			>
				<Icon name={overlayOpen ? 'close' : 'menu'} size={20} />
				<span>{overlayOpen ? 'Tutup' : 'Navigasi'}</span>
			</button>
			<button type="button" onclick={() => window.print()}>
				<Icon name="download" size={20} />
				<span>Unduh PDF</span>
			</button>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto links are external -->
			<a class="on" href={links.mailtoFreelance}>
				<Icon name="mail" size={20} />
				<span>Hubungi</span>
			</a>
		{:else}
			<button
				type="button"
				class:tint={navOpen}
				aria-expanded={ui.menuOpen}
				onclick={() => (ui.menuOpen = !ui.menuOpen)}
			>
				<Icon name={ui.menuOpen ? 'close' : 'menu'} size={20} />
				<span>{ui.menuOpen ? 'Tutup' : 'Navigasi'}</span>
			</button>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto links are external -->
			<a href={links.mailtoFreelance}>
				<Icon name="mail" size={20} />
				<span>Hubungi</span>
			</a>
			<a class="on" href={resolve('/cv')}>
				<Icon name="file" size={20} />
				<span>Lihat CV</span>
			</a>
		{/if}
	</nav>
{/if}

{#if overlayOpen}
	<div class="overlay-scrim" aria-hidden="true" onclick={() => (overlayOpen = false)}></div>
{/if}

<dialog
	bind:this={overlayDialog}
	class="glass ov-glass ov-glass-strong overlay no-print"
	aria-label="Navigasi"
	onclose={() => (overlayOpen = false)}
>
	<span class="overlay-title">Navigasi</span>
	<nav class="sections" aria-label="Isi CV">
		{#each sections as section (section.id)}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware; the rule cannot see through string concatenation -->
			<a class="item" href={sectionHref(section.id)} aria-current={activeId === section.id ? 'location' : undefined} onclick={() => (overlayOpen = false)}>
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
	}

	.overlay-scrim {
		position: fixed;
		inset: 0;
		z-index: 25;
		background: var(--scrim);
		-webkit-backdrop-filter: blur(20px) saturate(160%);
		backdrop-filter: blur(20px) saturate(160%);
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
