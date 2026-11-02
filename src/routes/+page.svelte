<script lang="ts">
	import { resolve } from '$app/paths';
	import { getContent } from '#lib/content';
	import { links } from '#lib/links';
	import ContactBlock from '#lib/components/ContactBlock.svelte';
	import Icon from '#lib/components/Icon.svelte';

	const c = getContent('id');
	const recentRoles = ['peran-pena', 'peran-dptsi', 'peran-snpmb'].map((id) => {
		const role = c.roles.find((candidate) => candidate.id === id);
		if (!role) throw new Error(`Missing role: ${id}`);
		return role;
	});

	function projectHref(href: string) {
		return resolve('/cv') + '#' + href.split('#')[1];
	}
</script>

<svelte:head>
	<title>Zydhan Linnar Putra, backend engineer di Surabaya</title>
	<meta
		name="description"
		content="Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai."
	/>
	<link rel="canonical" href="{links.domain}/" />
	<meta property="og:title" content="Zydhan Linnar Putra, backend engineer di Surabaya" />
	<meta
		property="og:description"
		content="Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{links.domain}/" />
	<meta property="og:image" content="{links.domain}/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Zydhan Linnar Putra, backend engineer di Surabaya" />
	<meta
		name="twitter:description"
		content="Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai."
	/>
	<meta name="twitter:image" content="{links.domain}/og.png" />
</svelte:head>

<div class="page">
	<div
		class="mesh hero-mesh"
		aria-hidden="true"
		style="mask-image: linear-gradient(#000 62%, transparent); -webkit-mask-image: linear-gradient(#000 62%, transparent)"
	></div>

	<div class="wrap">
		<section class="hero" aria-labelledby="h-hero">
			<div class="hero-copy">
				<h1 id="h-hero">{c.hero.title}</h1>
				<p class="lead">{c.hero.body}</p>
				<div class="hero-actions">
					<a class="btn btn-primary" href={resolve('/cv')} data-floating-trigger>
						{c.hero.ctaPrimary}
						<Icon name="arrow-right" size={16} />
					</a>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware; the rule cannot see through string concatenation -->
					<a class="btn btn-ghost" href={resolve('/') + '#kontak'}>{c.hero.ctaSecondary}</a>
				</div>
			</div>

			<aside class="glass freelance" aria-labelledby="h-freelance">
				<h2 id="h-freelance">{c.freelance.title}</h2>
				<p class="desktop-only">{c.freelance.body}</p>
				<p class="mobile-only">{c.freelance.bodyShort}</p>
				<div class="freelance-links">
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto links are external -->
					<a class="btn btn-ghost" href={links.mailtoFreelance}>{links.email}</a>
					<a
						class="btn btn-ghost"
						href={links.linkedin}
						target="_blank"
						rel="external noopener">{links.linkedinHandle}</a
					>
				</div>
			</aside>
		</section>

		<section class="stats" aria-label="Dampak">
			{#each c.stats as stat (stat.value)}
				<div
					class="surface stat"
					class:accent={stat.accent}
					style={stat.accent
						? 'background: var(--accent); border-color: var(--accent); color: var(--onaccent)'
						: undefined}
				>
					<span class="stat-value">{stat.value}</span>
					<span class="desktop-only stat-label">{stat.label}</span>
					<span class="mobile-only stat-label">{stat.labelShort}</span>
				</div>
			{/each}
		</section>

		<section class="roles" aria-labelledby="h-roles">
			<h2 id="h-roles">{c.sectionTitles.recentRoles}</h2>
			<div class="surface roles-surface">
				{#each recentRoles as role (role.id)}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware; the rule cannot see through string concatenation -->
					<a class="row" href={resolve('/cv') + '#' + role.id}>
						<span class="row-main">
							<span class="row-title">{role.title}</span>
							{#if role.summary}
								<span class="row-sub">{role.summary}</span>
							{/if}
						</span>
						<span class="date" class:current={role.current}>{role.period}</span>
					</a>
				{/each}
			</div>
			<a class="btn btn-ghost all-roles" href={resolve('/cv')}>{c.sectionTitles.allRoles}</a>
		</section>

		<section class="projects" aria-labelledby="h-projects">
			<h2 id="h-projects">{c.sectionTitles.featured}</h2>
			<div class="project-grid">
				{#each c.featuredProjects as project (project.title)}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- projectHref() builds a base-aware CV anchor -->
					<a class="surface project" href={projectHref(project.href)}>
						<span class="desktop-only date">{project.date}</span>
						<span class="mobile-only date">{project.dateShort}</span>
						<span class="project-title">{project.title}</span>
						<span class="desktop-only project-desc">{project.description}</span>
						<span class="mobile-only project-desc">{project.descriptionShort}</span>
						<span class="chips">
							{#each project.chips as chip (chip)}
								<span class="chip">{chip}</span>
							{/each}
						</span>
					</a>
				{/each}
			</div>
		</section>

		<section class="writings" aria-labelledby="h-writings">
			<h2 id="h-writings">{c.sectionTitles.writings}</h2>
			<div class="surface writings-surface">
				{#each c.writings as writing (writing.href)}
					<a class="row" href={writing.href} target="_blank" rel="external noopener">
						<span class="row-main">
							<span class="row-title writing-title">{writing.title}</span>
							<span class="row-sub">{writing.meta}</span>
						</span>
						<span class="btn btn-ghost writing-cta">{writing.cta}</span>
					</a>
				{/each}
			</div>
		</section>

		<ContactBlock />
	</div>
</div>

<style>
	.page {
		position: relative;
		overflow: hidden;
	}

	.hero-mesh {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 760px;
		pointer-events: none;
	}

	.wrap {
		position: relative;
		width: 100%;
		max-width: 1120px;
		margin: 0 auto;
		padding: 24px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.hero-copy {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	h1 {
		margin: 0;
		font-size: 38px;
		line-height: 1.08;
		letter-spacing: -0.035em;
	}

	.lead {
		margin: 0;
		font-size: 16px;
		line-height: 1.6;
		color: var(--muted);
		max-width: 560px;
	}

	.hero-actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.freelance {
		min-width: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.freelance h2 {
		margin: 0;
		font-size: 20px;
		letter-spacing: -0.02em;
	}

	.freelance p {
		margin: 0;
		font-size: 15px;
		line-height: 1.6;
	}

	.freelance-links {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 6px;
	}

	.freelance-links a {
		justify-content: flex-start;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.stat {
		padding: 18px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.stat-value {
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.stat-label {
		font-size: 14px;
		line-height: 1.5;
		color: var(--muted);
	}

	.stat.accent .stat-label {
		color: var(--onaccent);
	}

	.roles,
	.projects,
	.writings {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	h2 {
		margin: 0;
		font-size: 26px;
		letter-spacing: -0.03em;
	}

	.roles-surface,
	.writings-surface {
		padding: 0 20px;
	}

	.roles-surface .row:last-child,
	.writings-surface .row:last-child {
		border-bottom: 0;
	}

	.roles-surface .row,
	.writings-surface .row {
		color: var(--text);
	}

	.row-main {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.row-title {
		display: block;
		font-weight: 600;
		font-size: 16px;
	}

	.row-sub {
		display: block;
		color: var(--muted);
		font-size: 14px;
	}

	.date.current {
		color: var(--accent);
		font-weight: 700;
	}

	.all-roles {
		align-self: flex-start;
		width: 100%;
	}

	.project-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 14px;
	}

	.project {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-decoration: none;
		color: var(--text);
	}

	.project-title {
		font-weight: 600;
		font-size: 18px;
	}

	.project-desc {
		color: var(--muted);
		font-size: 15px;
		line-height: 1.6;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 2px;
	}

	.writing-title {
		font-size: 15px;
	}

	.writing-cta {
		font-size: 13px;
	}

	.mobile-only {
		display: block;
	}

	.desktop-only {
		display: none;
	}

	@media (min-width: 768px) {
		.hero-mesh {
			height: 900px;
		}

		.wrap {
			padding: 24px 24px 64px;
			gap: 88px;
		}

		.hero {
			gap: 36px;
		}

		.hero-copy {
			gap: 24px;
		}

		h1 {
			font-size: 50px;
			line-height: 1.05;
		}

		.lead {
			font-size: 19px;
		}

		.hero-actions {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 12px;
		}

		.freelance {
			padding: 28px;
			gap: 16px;
		}

		.freelance h2 {
			font-size: 22px;
		}

		.stats {
			gap: 16px;
		}

		.stat {
			padding: 24px;
			gap: 6px;
		}

		.stat-value {
			font-size: 36px;
		}

		.stat-label {
			font-size: 15px;
		}

		h2 {
			font-size: 36px;
		}

		.roles,
		.projects,
		.writings {
			gap: 24px;
		}

		.roles-surface,
		.writings-surface {
			padding: 0 28px;
		}

		.row-title {
			font-size: 18px;
		}

		.row-sub {
			font-size: 15px;
		}

		.all-roles {
			width: auto;
		}

		.project-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 16px;
		}

		.project {
			padding: 28px;
			gap: 10px;
		}

		.project-title {
			font-size: 22px;
		}

		.project-desc {
			font-size: 16px;
		}

		.writing-title {
			font-size: 17px;
		}

		.writing-cta {
			font-size: 15px;
		}

		.mobile-only {
			display: none;
		}

		.desktop-only {
			display: block;
		}
	}

	@media (min-width: 1440px) {
		.hero {
			flex-direction: row;
			align-items: center;
			gap: 48px;
		}

		.hero-copy {
			flex: 1 1 560px;
		}

		.freelance {
			flex: 0 1 360px;
		}

		.stats {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		h1 {
			font-size: 60px;
		}
	}

	@media (min-width: 1920px) {
		.wrap {
			max-width: 1280px;
		}

		.project-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		h1 {
			font-size: 68px;
		}
	}
</style>
