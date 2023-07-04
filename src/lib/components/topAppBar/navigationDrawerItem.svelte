<script lang="ts">
  import { page } from '$app/stores';
  import { i, language } from '@inlang/sdk-js';
  import clsx from 'clsx';
  import type { MouseEventHandler } from 'svelte/elements';

  export let href = '';
  export let icon = '';
  export let nameLangKey = '';
  export let exact: boolean = false;
  export let as: 'button' | 'a' = 'a';
  export let click: MouseEventHandler<HTMLButtonElement> = () => {};

  let active = false;

  $: localizedHref = href === '/' ? `/${language}` : `/${language}${href}`;
  $: active = exact
    ? $page.url.pathname === localizedHref
    : $page.url.pathname.startsWith(localizedHref);
</script>

{#if as === 'a'}
  <a href={`/${language}${href}`}>
    <div data-active={active} aria-current={active ? 'page' : 'false'}>
      <div>
        <span
          class={clsx('material-symbols-rounded', active && 'material-symbols-rounded--filled')}
          aria-hidden="true"
          data-active={active}>{icon}</span
        >
      </div>
      {i(`navigation.${nameLangKey}`)}
    </div>
  </a>
{:else}
  <button on:click={click}>
    <div>
      <div>
        <span class="material-symbols-rounded" aria-hidden="true">{icon}</span>
      </div>
      {i(`navigation.${nameLangKey}`)}
    </div>
  </button>
{/if}

<style lang="scss">
  @use '$lib/styles/typography.scss';

  a,
  button {
    display: flex;
    height: 56px;
    width: 100%;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    padding: 0;

    border-radius: 100px;
    overflow: hidden;
    color: inherit;
    @include typography.typography-builder('label', 'large');

    &:visited {
      color: rgb(var(--md-sys-color-on-surface-variant));
    }

    $states: (
      'focus': 'focus',
      'hover': 'hover',
      'active': 'pressed',
    );
    @each $state, $varName in $states {
      &:#{$state} > div {
        background-color: rgba(
          var(--md-sys-color-on-surface-variant),
          var(--md-sys-state- + $varName + -state-layer-opacity)
        );
      }
    }

    & > div {
      display: flex;
      padding: 16px 24px 16px 16px;
      align-items: center;
      gap: 12px;
      flex: 1 0 0;
      align-self: stretch;

      & > div {
        width: 24px;
        height: 24px;
      }
    }
  }

  a > div[data-active='true'] {
    background-color: rgb(var(--md-sys-color-secondary-container)) !important;
    color: rgb(var(--md-sys-color-on-secondary-container));
  }
</style>
