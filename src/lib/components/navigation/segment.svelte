<script lang="ts">
  import { i, language } from '@inlang/sdk-js';
  import { page } from '$app/stores';
  import clsx from 'clsx';

  export let href: string;
  export let icon: string;
  export let nameLangKey: string;
  export let exact: boolean;

  $: localizedHref = href === '/' ? `/${language}` : `/${language}${href}`;
  $: active = exact
    ? $page.url.pathname === localizedHref
    : $page.url.pathname.startsWith(localizedHref);
</script>

<a href={`/${language}${href}`} data-active={active}>
  <div aria-hidden={true}>
    <div data-active={active}>
      <span
        data-active={active}
        class={clsx('material-symbols-rounded', active && 'material-symbols-rounded--filled')}
        >{icon}</span
      >
    </div>
  </div>
  {i(`navigation.${nameLangKey}`)}
</a>

<style lang="scss">
  @use '$lib/styles/typography.scss' as typography;
  @use '$lib/styles/tokens/layout.scss' as layout;
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use 'sass:map';

  $states: (
    'focus': 'focus',
    'hover': 'hover',
    'active': 'pressed',
  );

  a {
    @include typography.typography-builder('label', 'medium');
    display: flex;
    @include layout.center-xy;
    flex-direction: column;
    padding-top: 12px;
    padding-bottom: 16px;
    color: inherit;
    row-gap: 4px;
    text-align: center;
    transition-property: color;

    &,
    & * {
      transition-duration: var(--md-sys-motion-duration-medium2);
      transition-timing-function: var(--md-sys-motion-easing-standard);
    }

    &:hover {
      color: rgb(var(--md-sys-color-on-secondary-container));
    }

    @each $state, $varName in $states {
      &:#{$state} > div > div {
        background-color: rgba(
          var(--md-sys-color-on-secondary-container),
          var(--md-sys-state- + $varName + -state-layer-opacity)
        );
      }
    }

    &[data-active='true'] {
      color: rgb(var(--md-sys-color-on-surface));
    }

    @media (min-width: map.get(window.$screens, 'medium')) {
      @include layout.padding-y(0);
      height: 56px;
      justify-content: flex-start;
    }

    & > div {
      border-radius: 16px;
      overflow: hidden;

      & > div {
        display: flex;
        @include layout.center-xy;
        top: 0;
        left: 0;
        width: 64px;
        height: 32px;
        transition-property: color, background-color;

        &[data-active='true'] {
          background-color: rgb(var(--md-sys-color-secondary-container)) !important;
          color: rgb(var(--md-sys-color-on-secondary-container));
        }

        @media (min-width: map.get(window.$screens, 'medium')) {
          width: 56px;
          height: 32px;
        }
      }
    }
  }
</style>
