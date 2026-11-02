<script lang="ts">
	import { getContent } from '#lib/content';
	import { links } from '#lib/links';

	let { compact = false }: { compact?: boolean } = $props();

	const c = getContent('id');
</script>

<section id="kontak" class="contact">
	<div class="mesh-c" aria-hidden="true"></div>
	<div class="glass panel">
		<h2>{c.contact.title}</h2>
		<p>{compact ? c.contact.bodyShort : c.contact.body}</p>
		<div class="actions">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto links are external -->
			<a class="btn btn-primary" href={links.mailtoFreelance}>{c.contact.ctaEmail}</a>
			<a class="btn btn-ghost" href={links.linkedin} target="_blank" rel="external noopener">
				{c.contact.ctaLinkedIn}
			</a>
		</div>
	</div>
</section>

<style>
	.contact {
		position: relative;
		overflow: hidden;
		border-radius: 28px;
		padding: 16px;
		background: var(--bg);
	}

	.mesh-c {
		position: absolute;
		inset: 0;
	}

	.panel {
		position: relative;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		align-items: flex-start;
	}

	h2 {
		margin: 0;
		font-size: 28px;
		line-height: 1.15;
		letter-spacing: -0.035em;
		max-width: 640px;
	}

	p {
		margin: 0;
		font-size: 15px;
		line-height: 1.6;
		max-width: 560px;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	.actions a {
		width: 100%;
	}

	@media (min-width: 768px) {
		.contact {
			border-radius: 32px;
			padding: 32px;
		}

		.panel {
			padding: 40px;
			gap: 20px;
		}

		h2 {
			font-size: 36px;
			line-height: 1.1;
		}

		p {
			font-size: 17px;
		}

		.actions {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 12px;
			width: auto;
		}

		.actions a {
			width: auto;
		}
	}

	@media (min-width: 1440px) {
		.contact {
			padding: 48px;
		}

		.panel {
			padding: 48px;
		}

		h2 {
			font-size: 44px;
		}
	}
</style>
