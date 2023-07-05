<script>
  import Experiences from '$lib/components/pages/home/experiences.svelte';
  import Favorite from '$lib/components/pages/home/favorite.svelte';
  import Header from '$lib/components/pages/home/header.svelte';
  import RecentRepositories from '$lib/components/pages/home/recentRepositories.svelte';
  import { i } from '@inlang/sdk-js';
</script>

<svelte:head>
  <title>{i('page.home.title')}</title>
</svelte:head>

<div class="container">
  <div class="content">
    <Header />
    <main>
      <Favorite />
      <Experiences />
      <RecentRepositories />
    </main>
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use '$lib/styles/tokens/layout.scss';
  @use 'sass:map';
  $row-gap: 24px;

  main {
    display: flex;
    flex-direction: column;
    row-gap: $row-gap;
  }

  div.content {
    display: flex;
    flex-direction: column;
    row-gap: $row-gap;
    max-width: 1024px;

    @media (min-width: map.get(window.$screens, 'expanded')) {
      @include layout.padding-y(24px);
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
