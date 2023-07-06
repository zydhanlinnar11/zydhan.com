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

<div class="container">
  <div class="content">
    <PageHeader title={i('page.blog.header.title')} subtitle={i('page.blog.header.subtitle')} />
    <main>
      <ul>
        {#each data.posts as post (post.slug)}
          <li><PostCard {post} /></li>
        {/each}
      </ul>
    </main>
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use 'sass:map';
  .content {
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

  .container {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    margin-bottom: 80px;
    --margin-top: 64px;
    margin-top: var(--margin-top);
    scroll-margin-top: var(--margin-top);
    $padding: 16px;

    padding: $padding;

    @media (min-width: map.get(window.$screens, 'medium')) {
      --margin-top: 0;
      margin-bottom: 0;
      margin-left: 80px;
    }
  }
</style>
