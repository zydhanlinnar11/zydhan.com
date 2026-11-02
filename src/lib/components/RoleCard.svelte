<script lang="ts">
	import type { Role } from '#lib/content';

	let { role }: { role: Role } = $props();
</script>

{#if role.bullets.length === 0}
	<div id={role.id} class="surface intern">
		<div class="head">
			<div class="role-id">
				<h3>{role.title}</h3>
				{#if role.summary}
					<p class="org">{role.summary}</p>
				{/if}
			</div>
			<span class="date" class:current={role.current}>{role.period}</span>
		</div>
	</div>
{:else}
	<article id={role.id} class="surface role">
		<div class="head">
			<div class="role-id">
				<h3>{role.title}</h3>
				<p class="org">
					{role.org}{role.location ? `, ${role.location}` : ''}
				</p>
			</div>
			<span class="date" class:current={role.current}>{role.period}</span>
		</div>

		<ul class="bullets">
			{#each role.bullets as bullet (bullet)}
				<li>{bullet}</li>
			{/each}
		</ul>

		{#if role.chips.length > 0}
			<div class="chips">
				{#each role.chips as chip (chip)}
					<span class="chip">{chip}</span>
				{/each}
			</div>
		{/if}
	</article>
{/if}

<style>
	.role,
	.intern {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		scroll-margin-top: 96px;
	}

	.intern {
		padding: 22px 24px;
		gap: 0;
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px;
	}

	.role-id {
		min-width: 0;
	}

	h3 {
		margin: 0;
		font-size: 18px;
		line-height: 1.3;
		letter-spacing: -0.015em;
	}

	.org {
		margin: 2px 0 0;
		color: var(--muted);
		font-size: 15px;
		line-height: 1.5;
	}

	.date {
		flex: 0 0 auto;
	}

	.date.current {
		color: var(--accent);
		font-weight: 700;
	}

	.bullets {
		margin: 0;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 15px;
		line-height: 1.6;
	}

	.bullets li {
		padding-left: 2px;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	@media (min-width: 768px) {
		.role {
			padding: 28px;
		}

		.intern {
			padding: 22px 28px;
		}

		h3 {
			font-size: 20px;
		}
	}

	@media print {
		.role,
		.intern {
			break-inside: avoid;
		}
	}
</style>
