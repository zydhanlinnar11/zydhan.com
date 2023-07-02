<script context="module">
  import newUniqueId from 'locally-unique-id-generator';
</script>

<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import type GithubRepository from '$lib/types/GithubRepository';

  export let repository: GithubRepository;
  const linkId = newUniqueId();
</script>

<a href={repository.html_url} target="_blank" aria-labelledby={linkId}>
  <article>
    <h3>
      {repository.name}
    </h3>
    <p>{repository.description ?? i('page.home.repositories_section.no_desc_available')}</p>
    <ul>
      {#each repository.topics as topic}
        <li>{topic}</li>
      {/each}
    </ul>
  </article>
</a>

<style lang="scss">
  @use '$lib/styles/typography.scss' as typography;
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use '$lib/components/pages/home/style.scss' as styles;
  @use 'sass:map';

  article {
    @include styles.list-section-item;
  }

  h3 {
    @include styles.list-section-title;

    @media (min-width: map.get(window.$screens, 'medium')) {
      grid-row: 1 / 1;
    }
  }

  ul {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  li {
    @include typography.typography-builder('label', 'large');
    border-radius: 8px;
    padding: 6px 12px;
    background-color: rgb(var(--md-sys-color-secondary-container));
    color: rgb(var(--md-sys-color-on-secondary-container));
  }
</style>
