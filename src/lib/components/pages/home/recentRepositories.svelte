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
  <div>
    {#each $page.data.repositories as repository}
      <RecentRepositoryItem {repository} />
    {/each}
  </div>
  <div class="button-wrapper">
    <Button as="a" href="https://github.com/zydhanlinnar11" target="_blank"
      >{i('page.home.repositories_section.view_all_repositories')} →</Button
    >
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/typography.scss' as typography;
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
  }
</style>
