<script lang="ts">
	import { content } from '#lib/content';
	import { links } from '#lib/links';

	const c = content.id;
</script>

<div class="footer-wrap">
	<footer>
		<span>{c.footer.copyright}</span>
		<span class="links">
			<a href={links.github} target="_blank" rel="external noopener">{c.footer.github}</a>
			<a href={links.linkedin} target="_blank" rel="external noopener">{c.footer.linkedin}</a>
		</span>
	</footer>
</div>

<style>
	.footer-wrap {
		max-width: 1120px;
		margin: 0 auto;
		padding: 40px 16px 104px;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px;
		color: var(--muted);
		font-size: 14px;
	}

	.links {
		display: flex;
		gap: 20px;
	}

	.links a {
		color: var(--muted);
		text-decoration: none;
		transition: color 180ms var(--ease-out);
	}

	.links a:hover {
		color: var(--text);
	}

	@media (min-width: 768px) {
		.footer-wrap {
			padding: 40px 24px 64px;
		}
	}

	@media (min-width: 1920px) {
		.footer-wrap {
			max-width: 1280px;
		}
	}
</style>
