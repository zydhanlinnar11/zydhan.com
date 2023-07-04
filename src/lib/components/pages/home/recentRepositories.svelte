<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import RecentRepositoryItem from './recentRepositoryItem.svelte';
  import { page } from '$app/stores';
  import Button from '$lib/components/button.svelte';
</script>

<section>
  <h2>
    {i('page.home.repositories_section.title')}
  </h2>
  <ul>
    {#each $page.data.repositories as repository}
      <li><RecentRepositoryItem {repository} /></li>
    {/each}
  </ul>
  <div class="button-wrapper">
    <Button
      as="a"
      href="https://github.com/zydhanlinnar11"
      target="_blank"
      className="responsive-button"
      >{i('page.home.repositories_section.view_all_repositories')} →</Button
    >
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/typography.scss' as typography;
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use '$lib/components/pages/home/style.scss' as styles;
  @use 'sass:map';

  section {
    @include styles.section;

    & > h2 {
      @include typography.typography-builder('headline', 'small');
    }
  }

  div.button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 0.625rem;
    align-self: stretch;

    & > :global(.responsive-button) {
      width: 100%;

      @media (min-width: map.get(window.$screens, 'medium')) {
        width: 240px;
      }
    }
  }
</style>
