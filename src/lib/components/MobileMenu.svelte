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
			clearTimeout(timer);
			closing = false;
			const theme = document.documentElement.dataset.theme;
			if (theme === 'light' || theme === 'dark') current = theme;
			if (!dialog.open) dialog.showModal();
		} else if (dialog.open) {
			requestClose();
		}
	});

	$effect(() => {
		document.body.style.overflow = ui.menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	let closing = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function finishClose() {
		if (!dialog?.open) return;
		dialog.close();
		closing = false;
	}

	function requestClose() {
		if (!dialog?.open || closing) return;
		closing = true;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		clearTimeout(timer);
		timer = setTimeout(finishClose, reduce ? 0 : 170);
	}

	function close() {
		ui.menuOpen = false;
	}

	function choose(theme: Theme) {
		current = setTheme(theme);
	}
</script>

<dialog
	bind:this={dialog}
	class="menu"
	class:closing
	aria-label="Menu"
	oncancel={(e) => {
		e.preventDefault();
		close();
	}}
	onclose={() => (ui.menuOpen = false)}
>
	<div class="menu-bar glass bar-glass">
		<a class="logo" href={resolve('/')} aria-label="Zydhan, ke Home" onclick={close}>
			<img src={asset('logo.webp')} alt="Zydhan" width="40" height="40" />
		</a>
		<button class="close" type="button" aria-label="Tutup menu" onclick={close}>
			<Icon name="close" size={20} />
		</button>
	</div>

	<div class="panel glass ov-glass">
		<nav class="menu-nav" aria-label="Menu utama">
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
		top: 0;
		left: 0;
		right: 0;
		width: auto;
		max-width: none;
		height: auto;
		max-height: 100dvh;
		margin: 0;
		padding: 16px;
		border: 0;
		background: transparent;
		color: var(--text);
		overflow: auto;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.menu-bar,
	.panel {
		opacity: 1;
		transform: none;
		transition:
			opacity 240ms var(--ease-out),
			transform 320ms var(--ease-out);
	}

	.panel {
		transition-delay: 50ms;
	}

	@starting-style {
		.menu[open] .menu-bar,
		.menu[open] .panel {
			opacity: 0;
			transform: translateY(-12px);
		}
	}

	.menu.closing .menu-bar,
	.menu.closing .panel {
		opacity: 0;
		transform: translateY(-12px);
		transition:
			opacity 160ms var(--ease-in),
			transform 160ms var(--ease-in);
		transition-delay: 0s;
	}

	.menu-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 6px 6px 6px 8px;
		border-radius: 999px;
	}

	.panel {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 12px 12px 20px;
		border-radius: 22px;
		box-sizing: border-box;
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

	.menu-nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.menu-nav .item[aria-current='page'] {
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
