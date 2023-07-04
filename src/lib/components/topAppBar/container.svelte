<script lang="ts">
  import siteLogo from '$lib/assets/images/site-logo.webp';
  import { i } from '@inlang/sdk-js';
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import NavigationDrawer from './navigationDrawer.svelte';

  export let className = '';
  let isScrolled = false;
  let isOpen = false;

  onMount(() => {
    const scrollHandler = () => {
      isScrolled = window.scrollY > 0;
    };
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });

  function openDrawer() {
    isOpen = true;
  }
</script>

<div class={clsx('container', className, isScrolled && 'scroll')}>
  <div class="leading-icon">
    <button on:click={openDrawer}>
      <div class="state-layer"><span class="material-symbols-rounded"> menu </span></div>
    </button>
  </div>

  <div class="logo-container">
    <img src={siteLogo} alt={i('navigation.site_logo')} aria-hidden="true" width="28" height="28" />
  </div>

  <!-- TODO: add functionality -->
  <div class="trailing-icon">
    <button>
      <div class="state-layer"><span class="material-symbols-rounded"> account_circle </span></div>
    </button>
  </div>
</div>

<NavigationDrawer bind:open={isOpen} />

<style lang="scss">
  $states: (
    'focus': 'focus',
    'hover': 'hover',
    'active': 'pressed',
  );

  .container {
    display: flex;
    height: 64px;
    padding: 8px 4px;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    gap: 6px;
    align-self: stretch;
    flex-wrap: wrap;
    position: fixed;
    top: 0;
    width: 100%;

    background-color: rgb(var(--md-sys-color-surface));
    transition-property: background-color;
    transition-duration: var(--md-sys-motion-duration-medium2);
    transition-timing-function: var(--md-sys-motion-easing-standard);

    & .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex: 1 0 0;
    }

    & .leading-icon,
    & .trailing-icon {
      display: flex;
      width: 48px;
      height: 48px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      & button {
        border-radius: 50%;
        overflow: hidden;
        padding: 0;
      }

      & .state-layer {
        display: flex;
        padding: 8px;
        justify-content: center;
        align-items: center;
        gap: 10px;

        @each $state, $varName in $states {
          &:#{$state} {
            background-color: rgba(
              var(--md-sys-color-on-surface),
              var(--md-sys-state- + $varName + -state-layer-opacity)
            );
          }
        }
      }
    }
  }

  .scroll {
    background-color: rgb(var(--md-sys-color-surface-container));
    z-index: 2;
  }
</style>
