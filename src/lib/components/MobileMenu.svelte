<script lang="ts">
	import { onMount } from 'svelte';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Theme } from '#lib/theme';
	import { setTheme } from '#lib/theme';
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
	<div class="head">
		<a class="logo" href={resolve('/')} aria-label="Zydhan, ke Home" onclick={close}>
			<img src={asset('logo.webp')} alt="Zydhan" width="40" height="40" />
		</a>
		<span class="head-title">Menu</span>
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

	<div class="spacer"></div>

	<button class="btn btn-ghost close-btn" type="button" aria-label="Tutup" onclick={close}>Tutup</button>
</dialog>

<style>
	.menu {
		position: fixed;
		inset: 0;
		width: 100%;
		max-width: none;
		height: 100dvh;
		max-height: none;
		margin: 0;
		border: 0;
		padding: 24px;
		background: var(--bg);
		color: var(--text);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 24px;
		overflow-y: auto;
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

	.head-title {
		font: 600 18px Inter, system-ui, sans-serif;
		color: var(--muted);
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

	.spacer {
		flex: 1;
	}

	.close-btn {
		width: 100%;
	}
</style>
