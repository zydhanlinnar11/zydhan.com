<script>
  import DarkModeFab from './darkModeFab.svelte';
  import Segment from './segment.svelte';

  const destinations = [
    {
      nameLangKey: 'home',
      href: '/',
      icon: 'home',
      exact: true,
    },
    {
      nameLangKey: 'blog',
      href: '/blog',
      icon: 'article',
      exact: false,
    },
    {
      nameLangKey: 'guestbook',
      href: '/guestbook',
      icon: 'book',
      exact: false,
    },
  ];
</script>

<div class="container">
  <nav>
    {#each destinations as destination (destination.href)}
      <Segment {...destination} />
    {/each}
  </nav>

  <div>
    <DarkModeFab />
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use '$lib/styles/tokens/layout.scss' as layout;
  @use 'sass:map';

  .container {
    background-color: rgb(var(--md-sys-color-surface-container));
    color: rgb(var(--md-sys-color-on-surface-variant));
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    @include layout.padding-x(8px);
    transition-property: background-color, color;
    transition-duration: var(--md-sys-motion-duration-medium2);
    transition-timing-function: var(--md-sys-motion-easing-standard);

    @media (min-width: map.get(window.$screens, 'medium')) {
      top: 0;
      bottom: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 80px;
      height: 100%;
      padding-top: 44px;
      padding-bottom: 56px;
      @include layout.padding-x(0);
    }

    nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      @include layout.center-xy;
      column-gap: 8px;

      @media (min-width: map.get(window.$screens, 'medium')) {
        grid-template-columns: repeat(1, 1fr);
        row-gap: 4px;
        padding: 5px;
      }
    }

    & > div {
      display: none;
      flex-direction: column;
      align-items: center;
      padding: 0px;
      gap: 4px;

      width: 80px;
      height: 56px;

      @media (min-width: map.get(window.$screens, 'medium')) {
        display: flex;
      }
    }
  }
</style>
