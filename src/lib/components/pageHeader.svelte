<script lang="ts">
  export let title: string;
  export let subtitle: string;
</script>

<header>
  <h1>{title}</h1>
  <p>{subtitle}</p>
</header>

<style lang="scss">
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use 'sass:map';
  @use '$lib/styles/typography.scss';

  header {
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    border-radius: 24px;
    height: fit-content;

    @media (min-width: map.get(window.$screens, 'medium')) {
      padding: 24px;
    }
  }

  h1 {
    @include typography.typography-builder('display', 'small');
  }

  p {
    color: var(--md-sys-color-on-surface-variant);
  }
</style>
