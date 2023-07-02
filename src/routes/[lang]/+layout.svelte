<script>
  import Navigation from '$lib/components/navigation/container.svelte';
</script>

<Navigation />
<slot />

<style lang="scss" global>
  @import '$lib/styles/globals.scss';
  @import 'https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100..1000&display=swap';

  :global(:root) {
    --md-ref-typeface-plain: 'Roboto Flex', sans-serif;
  }
</style>
