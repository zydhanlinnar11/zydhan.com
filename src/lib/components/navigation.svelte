<script lang="ts">
  import NavigationRail from '$lib/components/navigationRail/container.svelte';
  import TopAppBar from '$lib/components/topAppBar/container.svelte';
</script>

<NavigationRail className="navigation-rail" />
<TopAppBar className="top-app-bar" />

<style lang="scss">
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use 'sass:map';

  :global(.navigation-rail) {
    display: none;
  }

  :global(.top-app-bar) {
    display: block;
  }

  @media (min-width: map.get(window.$screens, 'medium')) {
    :global(.navigation-rail) {
      display: block;
    }

    :global(.top-app-bar) {
      display: none !important;
    }
  }
</style>
