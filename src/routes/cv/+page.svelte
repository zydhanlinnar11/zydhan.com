<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { getContent } from '#lib/content';
	import { links } from '#lib/links';
	import ContactBlock from '#lib/components/ContactBlock.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import RoleCard from '#lib/components/RoleCard.svelte';

	const c = getContent('id');
	const summaryDescription = c.summary.split('. ')[0] + '.';

	const sections = [
		{ id: 'ringkasan', label: c.sectionTitles.summary },
		{ id: 'pengalaman', label: c.sectionTitles.experience },
		{ id: 'keahlian', label: c.sectionTitles.skills },
		{ id: 'pendidikan', label: c.sectionTitles.education },
		{ id: 'tulisan', label: c.sectionTitles.writings }
	] as const;

	const cvWritings = c.writings.filter((writing) => writing.onCv);

	let active = $state<string>(sections[0].id);

	function sectionHref(id: string) {
		return resolve('/cv') + '#' + id;
	}

	onMount(() => {
		const elements = sections
			.map((section) => document.getElementById(section.id))
			.filter((element): element is HTMLElement => element !== null);
		const lastId = sections[sections.length - 1].id;

		function updateActive() {
			const atBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

			if (atBottom) {
				active = lastId;
				return;
			}

			const current = elements
				.filter((element) => element.getBoundingClientRect().top <= 120)
				.at(-1);

			active = current?.id ?? sections[0].id;
		}

		const observer = new IntersectionObserver(updateActive, {
			rootMargin: '-120px 0px -100% 0px',
			threshold: 0
		});

		for (const element of elements) {
			observer.observe(element);
		}

		window.addEventListener('scroll', updateActive, { passive: true });
		window.addEventListener('hashchange', updateActive);
		updateActive();

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', updateActive);
			window.removeEventListener('hashchange', updateActive);
		};
	});
</script>

<svelte:head>
	<title>CV — Zydhan Linnar Putra</title>
	<meta name="description" content={summaryDescription} />
	<link rel="canonical" href="{links.domain}/cv" />
	<meta property="og:title" content="CV — Zydhan Linnar Putra" />
	<meta property="og:description" content={summaryDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{links.domain}/cv" />
	<meta property="og:image" content="{links.domain}/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="CV — Zydhan Linnar Putra" />
	<meta name="twitter:description" content={summaryDescription} />
	<meta name="twitter:image" content="{links.domain}/og.png" />
</svelte:head>

<div class="page">
	<div
		class="mesh cv-mesh"
		aria-hidden="true"
		style="mask-image: linear-gradient(#000 58%, transparent); -webkit-mask-image: linear-gradient(#000 58%, transparent)"
	></div>

	<div class="wrap">
		<header class="cv-head">
			<div class="intro">
				<h1>{c.name}</h1>
				<p class="tagline">{c.tagline}</p>
				<p class="note">{c.experienceNote}</p>
			</div>
			<div class="head-actions no-print">
				<button class="btn btn-primary" type="button" onclick={() => window.print()}>
					<Icon name="download" size={16} />
					Unduh PDF
				</button>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware; the rule cannot see through string concatenation -->
				<a class="btn btn-ghost" href={sectionHref('kontak')}>Ajak kerja sama</a>
			</div>
		</header>

		<nav class="pills no-print" aria-label="Isi CV" data-floating-trigger>
			{#each sections as section (section.id)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware; the rule cannot see through string concatenation -->
				<a href={sectionHref(section.id)}
					class:active={active === section.id}
					aria-current={active === section.id ? 'location' : undefined}>{section.label}</a
				>
			{/each}
		</nav>

		<div class="body">
			<aside class="surface toc no-print" aria-label="Isi CV">
				{#each sections as section (section.id)}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() is base-aware; the rule cannot see through string concatenation -->
					<a href={sectionHref(section.id)}
						class:active={active === section.id}
						aria-current={active === section.id ? 'location' : undefined}>{section.label}</a
					>
				{/each}
			</aside>

			<div class="content">
				<section id="ringkasan" aria-labelledby="h-ringkasan">
					<h2 id="h-ringkasan">{c.sectionTitles.summary}</h2>
					<div class="surface prose">
						<p>{c.summary}</p>
					</div>
				</section>

				<section id="pengalaman" aria-labelledby="h-pengalaman">
					<h2 id="h-pengalaman">{c.sectionTitles.experience}</h2>
					<div class="roles">
						{#each c.roles as role (role.id)}
							<RoleCard {role} />
						{/each}
					</div>
				</section>

				<section id="keahlian" aria-labelledby="h-keahlian">
					<h2 id="h-keahlian">{c.sectionTitles.skills}</h2>
					<div class="skills">
						{#each c.skills as group (group.name)}
							<div class="surface skill">
								<h3>{group.name}</h3>
								<div class="chips">
									{#each group.items as item (item)}
										<span class="chip">{item}</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</section>

				<section id="pendidikan" aria-labelledby="h-pendidikan">
					<h2 id="h-pendidikan">{c.sectionTitles.education}</h2>
					<div class="surface row education">
						<div class="row-main">
							<span class="row-title">{c.education.school}</span>
							<span class="row-sub">{c.education.detail}</span>
						</div>
						<span class="date">{c.education.period}</span>
					</div>
				</section>

				<section id="tulisan" aria-labelledby="h-tulisan">
					<h2 id="h-tulisan">{c.sectionTitles.writings}</h2>
					<div class="writings">
						{#each cvWritings as writing (writing.href)}
							<a
								class="surface row writing"
								href={writing.href}
								target="_blank"
								rel="external noopener"
							>
								<span class="row-main">
									<span class="row-title">{writing.title}</span>
									<span class="row-sub">{writing.meta}</span>
								</span>
								<span class="btn btn-ghost writing-cta">{writing.cta}</span>
							</a>
						{/each}
					</div>
				</section>
			</div>
		</div>

		<ContactBlock compact />
	</div>
</div>

<style>
	.page {
		position: relative;
		overflow: hidden;
	}

	.cv-mesh {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 620px;
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
		gap: 32px;
	}

	.cv-head {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-width: 0;
	}

	h1 {
		margin: 0;
		font-size: 38px;
		line-height: 1.05;
		letter-spacing: -0.035em;
	}

	.tagline {
		margin: 0;
		font-size: 18px;
		line-height: 1.55;
		max-width: 680px;
	}

	.note {
		margin: 0;
		font-size: 15px;
		line-height: 1.5;
		color: var(--muted);
	}

	.head-actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.pills {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		margin: 0 -24px;
		padding: 0 24px 4px;
		box-sizing: border-box;
	}

	.pills::-webkit-scrollbar {
		display: none;
	}

	.pills a {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		min-height: 40px;
		padding: 0 16px;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--chip);
		color: var(--muted);
		text-decoration: none;
		font: 600 14px Inter, system-ui, sans-serif;
	}

	.pills a.active {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--onaccent);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.toc {
		display: none;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 40px;
		min-width: 0;
	}

	.content > section {
		display: flex;
		flex-direction: column;
		gap: 16px;
		scroll-margin-top: 96px;
	}

	h2 {
		margin: 0;
		font-size: 26px;
		letter-spacing: -0.03em;
	}

	.prose {
		padding: 24px;
	}

	.prose p {
		margin: 0;
		font-size: 16px;
		line-height: 1.7;
	}

	.roles {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.skills {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 16px;
	}

	.skill {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.skill h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.education,
	.writing {
		padding: 20px;
		border-bottom: 1px solid var(--line);
		align-items: center;
	}

	.writing {
		color: var(--text);
		text-decoration: none;
	}

	.writing:hover {
		border-color: var(--accent);
	}

	.writings {
		display: flex;
		flex-direction: column;
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

	.writing-cta {
		font-size: 13px;
	}

	@media (min-width: 640px) {
		.skills {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 768px) {
		.cv-mesh {
			height: 760px;
		}

		.wrap {
			padding: 24px 24px 64px;
			gap: 40px;
		}

		.cv-head {
			flex-direction: row;
			flex-wrap: wrap;
			align-items: flex-end;
			justify-content: space-between;
			gap: 24px;
		}

		h1 {
			font-size: 52px;
		}

		.tagline {
			font-size: 19px;
		}

		.head-actions {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 12px;
		}

		.content {
			gap: 48px;
		}

		h2 {
			font-size: 28px;
		}

		.prose {
			padding: 28px;
		}

		.prose p {
			font-size: 17px;
		}

		.skill {
			padding: 24px;
		}

		.education,
		.writing {
			padding: 22px 28px;
		}

		.row-title {
			font-size: 17px;
		}

		.row-sub {
			font-size: 15px;
		}

		.writing-cta {
			font-size: 15px;
		}
	}

	@media (min-width: 1024px) {
		.pills {
			display: none;
		}

		.body {
			display: grid;
			grid-template-columns: 220px minmax(0, 1fr);
			gap: 32px;
			align-items: start;
		}

		.toc {
			display: flex;
			flex-direction: column;
			gap: 2px;
			width: 220px;
			padding: 12px;
			position: sticky;
			top: 24px;
			box-sizing: border-box;
		}

		.toc :global(a.active) {
			background: var(--accent);
			color: var(--onaccent);
		}
	}

	@media (min-width: 1920px) {
		.wrap {
			max-width: 1280px;
		}
	}

	@media print {
		.wrap {
			max-width: none;
			padding: 0;
			gap: 20px;
		}

		.cv-mesh {
			display: none;
		}

		.body {
			display: block;
		}

		.content {
			gap: 24px;
		}

		.roles {
			gap: 12px;
		}
	}
</style>
