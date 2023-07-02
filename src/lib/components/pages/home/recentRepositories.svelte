<script lang="ts">
  import type GithubRepository from '$lib/types/GithubRepository';
  import { i } from '@inlang/sdk-js';
  import RecentRepositoryItem from './recentRepositoryItem.svelte';

  // TODO: swr, error, and loading states
  async function getFromGithub() {
    const response = await fetch(
      `https://api.github.com/users/zydhanlinnar11/repos?sort=updated&per_page=5`,
    );
    if (!response.ok) throw await response.json();
    const data: GithubRepository[] = await response.json();
    return data;
  }

  const promise = getFromGithub();
</script>

<section>
  <h2>
    {i('page.home.repositories_section.title')}
  </h2>
  <div>
    {#await promise then repositories}
      {#each repositories as repository}
        <RecentRepositoryItem {repository} />
      {/each}
    {/await}
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
