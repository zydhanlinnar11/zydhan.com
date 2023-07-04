<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import RecentRepositoryItem from './recentRepositoryItem.svelte';
  import { page } from '$app/stores';
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
</style>
