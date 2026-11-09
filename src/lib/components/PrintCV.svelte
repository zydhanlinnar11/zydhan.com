<script lang="ts">
	import { getContent, type Lang } from '#lib/content';
	import { uiCopy } from '#lib/ui-copy';
	import { links } from '#lib/links';

	let { lang }: { lang: Lang } = $props();

	const c = $derived(getContent(lang));
	const copy = $derived(uiCopy[lang].print);
	const experience = $derived(c.roles);
</script>

<div class="print-only">
	<header class="p-head">
		<h1>{c.name}</h1>
		<div class="p-line">{c.pdf.headline}</div>
		<!-- eslint-disable svelte/no-navigation-without-resolve -- external links -->
		<div class="p-line">
			{copy.locationLine} | <a href={`mailto:${links.email}`}>{links.email}</a> |
			<a href={links.linkedin}>{links.linkedinHandle}</a> | <a href={links.domain}>zydhan.com</a>
		</div>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	</header>

	<section class="p-blk">
		<h2>{copy.summaryHeading}</h2>
		<p class="p-sum">{c.pdf.summary}</p>
	</section>

	<section class="p-blk">
		<h2>{c.sectionTitles.skills}</h2>
		<ul>
			{#each c.skills as group (group.name)}
				<li><b>{group.name}:</b> {group.items.join(', ')}.</li>
			{/each}
		</ul>
	</section>

	<section class="p-blk p-exp">
		<h2>{copy.experienceHeading}</h2>
		{#each experience as role (role.id)}
			<div class="p-blk">
				<div class="p-row">
					<span>
						{#if role.org}<b>{role.pdfOrg ?? role.org}</b>: {/if}<i>{role.org ? role.title.split(/( di | at )/)[0].trim() : role.title}</i>{#if role.id === 'peran-intern'}
							, {role.summary}{/if}
					</span>
					<span class="p-date">{role.period}</span>
				</div>
				{#if role.bullets.length}
					<ul>
						{#each role.pdfBullets ?? role.bullets as bullet (bullet)}
							<li>{bullet}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</section>

	<section class="p-blk">
		<h2>{copy.projectsHeading}</h2>
		<ul>
			{#each c.pdf.projects as project (project.text)}
				<li>
					{#if project.href}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external link -->
						<a href={project.href}>{project.text}</a>
					{:else}{project.text}{/if}
				</li>
			{/each}
		</ul>
	</section>

	<section class="p-blk">
		<h2>{c.sectionTitles.education}</h2>
		<div class="p-row">
			<span><b>{c.education.school}</b> || {copy.locationLine}</span>
			<span class="p-date">{c.education.period}</span>
		</div>
		<div class="p-edu"><i>{c.education.detail.replace(', Surabaya', '')}</i></div>
	</section>
</div>

<style>
	.print-only {
		font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
		color: #000;
		background: #fff;
		padding: 40px 44px 36px;
		box-sizing: border-box;
		flex-direction: column;
		gap: 9px;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}
	.p-head {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
		text-align: center;
	}
	h1 {
		margin: 0;
		font: 700 31px/1.1 'Source Serif 4', Georgia, 'Times New Roman', serif;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
	.p-line,
	.p-edu {
		font-size: 13px;
		line-height: 1.3;
	}
	a {
		color: #0b4f8a;
		text-decoration: underline;
	}
	.p-blk {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.p-exp {
		gap: 5px;
	}
	h2 {
		margin: 0;
		padding-bottom: 1px;
		border-bottom: 1.5px solid #000;
		font: 400 15px/1.2 'Source Serif 4', Georgia, 'Times New Roman', serif;
		letter-spacing: 0.01em;
		text-transform: uppercase;
	}
	.p-sum {
		margin: 0;
		font-size: 11.5px;
		line-height: 1.4;
	}
	.p-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 16px;
		font-size: 12px;
		line-height: 1.3;
	}
	.p-date {
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
		color: #000;
		font-family: inherit;
		font-size: inherit;
		font-weight: 400;
	}
	ul {
		margin: 0;
		padding-left: 30px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-size: 11.5px;
		line-height: 1.36;
		text-align: left;
	}
	b {
		font-weight: 600;
	}
</style>
