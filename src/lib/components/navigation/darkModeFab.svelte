<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { i } from '@inlang/sdk-js';

  // Subscribe to dark mode changes in html element
  let darkMode = false;
  let observer: MutationObserver | null = null;

  onMount(() => {
    const html = document.querySelector('html');
    observer = new MutationObserver(() => {
      darkMode = html?.classList.contains('dark') ?? false;
    });
    if (html) {
      observer.observe(html, { attributes: true });
    }
  });

  onDestroy(() => {
    observer?.disconnect();
  });

  function toggleDarkMode() {
    const html = document.querySelector('html');
    html?.classList.toggle('dark');
  }
</script>

<div>
  <button
    on:click={toggleDarkMode}
    aria-label={darkMode
      ? i('navigation.switch_to_light_mode')
      : i('navigation.switch_to_dark_mode')}
  >
    <span class="material-symbols-rounded light-mode" aria-hidden="true"> light_mode </span>
    <span class="material-symbols-rounded dark-mode" aria-hidden="true"> dark_mode </span>
  </button>
</div>

<style lang="scss">
  div > button > span {
    &.light-mode {
      display: none;
      :global(.dark) & {
        display: block;
      }
    }
    &.dark-mode {
      display: block;
      :global(.dark) & {
        display: none;
      }
    }
  }

  $states: (
    'focus': 'focus',
    'hover': 'hover',
    'active': 'pressed',
  );

  div {
    border-radius: 16px;
    border: 0;
    overflow: hidden;
    background-color: rgb(var(--md-sys-color-primary-container));
    color: rgb(var(--md-sys-color-on-primary-container));

    & > button {
      padding: 16px;
      transition-duration: var(--md-sys-motion-duration-medium2);
      transition-timing-function: var(--md-sys-motion-easing-standard);
      transition-property: background-color;
      border: 0;

      @each $state, $varName in $states {
        &:#{$state} {
          background-color: rgba(
            var(--md-sys-color-on-primary-container),
            var(--md-sys-state- + $varName + -state-layer-opacity)
          );
        }
      }
    }
  }
</style>
