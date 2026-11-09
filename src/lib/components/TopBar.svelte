<script lang="ts">
	import { page } from '$app/state';
	import { asset, resolve } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';
	import LangToggle from '#lib/components/LangToggle.svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import { langFromRouteId } from '#lib/i18n';
	import { mailtoFreelanceHref, uiCopy } from '#lib/ui-copy';
	import { ui } from '#lib/ui.svelte';

	const lang = $derived(langFromRouteId(page.route.id ?? '/'));
	const copy = $derived(uiCopy[lang]);

	const homeActive = $derived(page.route.id === '/' || page.route.id === '/id');
	const cvActive = $derived(page.route.id === '/cv' || page.route.id === '/id/cv');
</script>

<div class="bar-wrap">
	<header class="top-bar glass bar-glass">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware -->
		<a class="logo" href={resolve('/')} aria-label={copy.topBar.logoAria}>
			<img src={asset('logo.webp')} alt="Zydhan" width="40" height="40" />
		</a>

		<nav class="nav" aria-label={copy.topBar.navAria}>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware -->
			<a class:active={homeActive} href={resolve('/')} aria-current={homeActive ? 'page' : undefined}>Home</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware -->
			<a class:active={cvActive} href={resolve('/cv')} aria-current={cvActive ? 'page' : undefined}>CV</a>
		</nav>

		<div class="actions">
			<LangToggle />
			<ThemeToggle {lang} />
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto links are external -->
			<a class="btn btn-primary" href={mailtoFreelanceHref(lang)}>{copy.topBar.contact}</a>
		</div>

		<button
			class="menu-btn"
			type="button"
			aria-label={copy.topBar.openMenuAria}
			aria-expanded={ui.menuOpen}
			onclick={() => (ui.menuOpen = true)}
		>
			<Icon name="menu" size={20} />
		</button>
	</header>
</div>

<style>
	.bar-wrap {
		max-width: 1120px;
		margin: 0 auto;
		padding: calc(16px + env(safe-area-inset-top)) 16px 0;
		box-sizing: border-box;
		position: sticky;
		top: 0;
		z-index: 20;
		pointer-events: none;
	}

	.top-bar {
		pointer-events: auto;
	}

	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 6px 6px 6px 8px;
		border-radius: 999px;
	}

	.logo {
		display: inline-flex;
		flex: 0 0 auto;
		border-radius: 50%;
	}

	.logo img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.nav {
		display: none;
		gap: 4px;
	}

	.nav a.active {
		color: var(--onaccent);
		background: var(--accent);
	}

	@media (hover: hover) {
		.nav a.active:hover {
			background: var(--accenthover);
		}
	}

	.actions {
		display: none;
		align-items: center;
		gap: 8px;
	}

	.menu-btn {
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
		.menu-btn:hover {
			background: var(--chiphover);
			border-color: var(--accent);
		}
	}

	.menu-btn:active {
		transform: scale(0.96);
		transition-duration: 80ms;
	}

	@media (min-width: 768px) {
		.bar-wrap {
			padding: calc(24px + env(safe-area-inset-top)) 24px 0;
		}

		.nav {
			display: flex;
			flex-wrap: wrap;
		}

		.actions {
			display: flex;
		}

		.menu-btn {
			display: none;
		}
	}

	@media (min-width: 1920px) {
		.bar-wrap {
			max-width: 1280px;
		}
	}
</style>
