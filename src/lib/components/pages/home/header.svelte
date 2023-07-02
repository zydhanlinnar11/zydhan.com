<script lang="ts">
  import siteLogo from '$lib/assets/images/site-logo.webp';
  import { i } from '@inlang/sdk-js';
</script>

<header class="header">
  <img src={siteLogo} alt={i('page.home.header.logo_alt')} aria-hidden="true" />
  <h1>
    {i('page.home.header.title')}
  </h1>
  <p class="subtitle">
    {i('page.home.header.subtitle')}
  </p>
  <p class="description">
    {i('page.home.header.description')}
  </p>
</header>

<style lang="scss">
  @use '$lib/styles/typography.scss' as typography;
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use '$lib/styles/tokens/layout.scss';
  @use 'sass:map';

  header.header {
    background-color: rgb(var(--md-sys-color-surface-container));
    color: rgb(var(--md-sys-color-on-surface-container));
    border-radius: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    row-gap: 8px;
    width: 100%;
    text-align: center;

    @media (min-width: map.get(window.$screens, 'expanded')) {
      @include layout.padding-y(56px);
      @include layout.padding-x(128px);
      row-gap: 12px;
    }
  }

  img {
    width: 64px;
    height: 64px;

    @media (min-width: map.get(window.$screens, 'expanded')) {
      width: 128px;
      height: 128px;
    }
  }

  h1 {
    @include typography.typography-builder('headline', 'medium');

    @media (min-width: map.get(window.$screens, 'medium')) {
      @include typography.typography-builder('headline', 'large');
    }
  }

  p.subtitle {
    @media (min-width: map.get(window.$screens, 'medium')) {
      @include typography.typography-builder('body', 'large');
    }
  }

  p.description {
    @include typography.typography-builder('body', 'small');

    @media (min-width: map.get(window.$screens, 'medium')) {
      @include typography.typography-builder('body', 'medium');
    }
  }
</style>
