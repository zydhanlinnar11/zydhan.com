<script lang="ts">
	import { onMount } from 'svelte';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Theme } from '#lib/theme';
	import { setTheme } from '#lib/theme';
	import Icon from './Icon.svelte';
	import { ui } from '../ui.svelte.js';

	let dialog = $state<HTMLDialogElement>();

	const homeActive = $derived(page.route.id === '/');
	const cvActive = $derived(page.route.id?.startsWith('/cv') ?? false);

	let current = $state<Theme>('light');

	onMount(() => {
		const theme = document.documentElement.dataset.theme;
		if (theme === 'light' || theme === 'dark') current = theme;
	});

	$effect(() => {
		if (!dialog) return;
		if (ui.menuOpen) {
			const theme = document.documentElement.dataset.theme;
			if (theme === 'light' || theme === 'dark') current = theme;
			if (!dialog.open) dialog.showModal();
		} else if (dialog.open) {
			dialog.close();
		}
	});

	function close() {
		ui.menuOpen = false;
	}

	function choose(theme: Theme) {
		current = setTheme(theme);
	}
</script>

<dialog bind:this={dialog} class="menu" aria-label="Menu" onclose={() => (ui.menuOpen = false)}>
	<div class="panel">
		<div class="head">
			<a class="logo" href={resolve('/')} aria-label="Zydhan, ke Home" onclick={close}>
				<img src={asset('logo.webp')} alt="Zydhan" width="40" height="40" />
			</a>
			<button class="close" type="button" aria-label="Tutup menu" onclick={close}>
				<Icon name="close" size={20} />
			</button>
		</div>

		<nav class="nav" aria-label="Menu utama">
			<a class="item" href={resolve('/')} aria-current={homeActive ? 'page' : undefined} onclick={close}
				>Home</a
			>
			<a class="item" href={resolve('/cv')} aria-current={cvActive ? 'page' : undefined} onclick={close}>
				CV
			</a>
		</nav>

		<div class="prefs">
			<div class="field">
				<span class="lbl">Tema</span>
				<div class="seg" role="group" aria-label="Tema">
					<button
						type="button"
						class:on={current === 'light'}
						aria-pressed={current === 'light'}
						onclick={() => choose('light')}>Terang</button
					>
					<button
						type="button"
						class:on={current === 'dark'}
						aria-pressed={current === 'dark'}
						onclick={() => choose('dark')}>Gelap</button
					>
				</div>
			</div>
		</div>

		<button class="btn btn-ghost close-btn" type="button" aria-label="Tutup" onclick={close}>Tutup</button>
	</div>
</dialog>

<style>
	.menu {
		position: fixed;
		top: 16px;
		left: 16px;
		right: 16px;
		width: auto;
		max-width: none;
		height: auto;
		max-height: calc(100dvh - 32px);
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--text);
		overflow: visible;
		box-sizing: border-box;
	}

	.panel {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 16px;
		background: var(--glassov);
		border: 1px solid var(--glassline);
		box-shadow: var(--shadow), inset 0 1px 0 var(--glasshi);
		border-radius: 22px;
		max-height: calc(100dvh - 32px);
		overflow: auto;
		box-sizing: border-box;
		-webkit-backdrop-filter: blur(12px) saturate(160%);
		backdrop-filter: blur(12px) saturate(160%);
	}

	@media (prefers-reduced-transparency: reduce) {
		.panel {
			background: var(--solid);
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
	}

	@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
		.panel {
			background: var(--solid);
		}
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.logo {
		display: inline-flex;
		border-radius: 50%;
	}

	.logo img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		min-width: 44px;
		min-height: 44px;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--chip);
		color: var(--text);
		cursor: pointer;
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.nav .item[aria-current='page'] {
		background: var(--accenttint);
		color: var(--accent);
	}

	.prefs {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 0 8px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.lbl {
		font: 500 14px Inter, system-ui, sans-serif;
		color: var(--muted);
	}

	.seg button.on {
		background: var(--accent);
		color: var(--onaccent);
	}

	.close-btn {
		width: 100%;
	}
</style>
