<script lang="ts">
	import { onMount } from 'svelte';
	import { asset, resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Lang } from '#lib/content';
	import { langFromRouteId, langHref } from '#lib/i18n';
	import { counterpartHref } from '#lib/lang-nav';
	import type { Theme } from '#lib/theme';
	import { setTheme } from '#lib/theme';
	import { uiCopy } from '#lib/ui-copy';
	import Icon from './Icon.svelte';
	import { ui } from '#lib/ui.svelte';

	let dialog = $state<HTMLDialogElement>();

	const lang = $derived(langFromRouteId(page.route.id ?? '/'));
	const copy = $derived(uiCopy[lang].mobileMenu);

	type HostRoute = '/' | '/id' | '/cv' | '/id/cv';
	// Nav is language-aware: langHref keeps visitors on their language,
	// resolve() is base-aware (correct hrefs when paths.base is non-empty).
	const homeHref = $derived(resolve(langHref('/', lang) as HostRoute));
	const cvHref = $derived(resolve(langHref('/cv', lang) as HostRoute));

	const homeActive = $derived(page.route.id === '/' || page.route.id === '/id');
	const cvActive = $derived(page.route.id === '/cv' || page.route.id === '/id/cv');

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

	function goLang(target: Lang) {
		if (target === lang) return;
		close();
		// eslint-disable-next-line svelte/no-navigation-without-resolve -- counterpartHref() already runs resolve()
		void goto(counterpartHref(page.route.id ?? '/', page.params));
	}
</script>

<dialog
	bind:this={dialog}
	class="menu"
	class:closing
	aria-label={copy.dialogAria}
	oncancel={(e) => {
		e.preventDefault();
		close();
	}}
	onclose={() => (ui.menuOpen = false)}
>
	<div class="menu-bar glass bar-glass">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware -->
		<a class="logo" href={homeHref} aria-label={copy.logoAria} onclick={close}>
			<img src={asset('logo.webp')} alt="Zydhan" width="40" height="40" />
		</a>
		<button class="close" type="button" aria-label={copy.closeAria} onclick={close}>
			<Icon name="close" size={20} />
		</button>
	</div>

	<div class="panel glass ov-glass">
		<nav class="menu-nav" aria-label={copy.navAria}>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware -->
			<a class="item" href={homeHref} aria-current={homeActive ? 'page' : undefined} onclick={close}
				>Home</a
			>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- homeHref/cvHref run resolve() inside -->
			<a class="item" href={cvHref} aria-current={cvActive ? 'page' : undefined} onclick={close}>
				CV
			</a>
		</nav>

		<div class="prefs">
			<div class="field">
				<span class="lbl">{copy.langHeading}</span>
				<div class="seg" role="group" aria-label={copy.langHeading}>
					<button
						type="button"
						class:on={lang === 'id'}
						aria-pressed={lang === 'id'}
						onclick={() => goLang('id')}>{copy.indonesia}</button
					>
					<button
						type="button"
						class:on={lang === 'en'}
						aria-pressed={lang === 'en'}
						onclick={() => goLang('en')}>{copy.english}</button
					>
				</div>
			</div>

			<div class="field">
				<span class="lbl">{copy.themeHeading}</span>
				<div class="seg" role="group" aria-label={copy.themeAria}>
					<button
						type="button"
						class:on={current === 'light'}
						aria-pressed={current === 'light'}
						onclick={() => choose('light')}>{copy.light}</button
					>
					<button
						type="button"
						class:on={current === 'dark'}
						aria-pressed={current === 'dark'}
						onclick={() => choose('dark')}>{copy.dark}</button
					>
				</div>
			</div>
		</div>

		<button class="btn btn-ghost close-btn" type="button" aria-label={copy.closeLabel} onclick={close}
			>{copy.closeLabel}</button
		>
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
		transition: background-color 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 180ms var(--ease-out);
	}

	@media (hover: hover) {
		.close:hover {
			background: var(--chiphover);
			border-color: var(--accent);
		}
	}

	.close:active {
		transform: scale(0.96);
		transition-duration: 80ms;
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
