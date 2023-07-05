<script lang="ts">
  import PageHeader from '$lib/components/pageHeader.svelte';
  import { i } from '@inlang/sdk-js';
  import type { PageData } from './$types';
  import PostCard from '$lib/components/postCard.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>{i('page.blog.title')}</title>
</svelte:head>

<div>
  <PageHeader title={i('page.blog.header.title')} subtitle={i('page.blog.header.subtitle')} />
  <main>
    <ul>
      {#each data.posts as post (post.slug)}
        <li><PostCard {post} /></li>
      {/each}
    </ul>
  </main>
</div>

<style lang="scss">
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use 'sass:map';
  div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1024px;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: map.get(window.$screens, 'medium')) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: map.get(window.$screens, 'expanded')) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
