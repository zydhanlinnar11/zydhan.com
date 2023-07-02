<script>
  import Favorite from '$lib/components/pages/home/favorite.svelte';
  import Header from '$lib/components/pages/home/header.svelte';
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

  div.container {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    margin-bottom: 80px;

    @media (min-width: map.get(window.$screens, 'medium')) {
      margin-bottom: 0;
      margin-left: 80px;
    }
  }

  div.content {
    $padding: 16px;

    padding: $padding;
    display: flex;
    flex-direction: column;
    row-gap: $row-gap;
    max-width: 1024px;

    @media (min-width: map.get(window.$screens, 'expanded')) {
      @include layout.padding-y(24px);
    }
  }
</style>
