<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  const darkMode = getContext<Writable<boolean>>('darkMode');
</script>

<div>
  <button
    on:click={() => {
      darkMode.update((value) => !value);
    }}
    aria-label={darkMode
      ? i('navigation.switch_to_light_mode')
      : i('navigation.switch_to_dark_mode')}
  >
    <span class="material-symbols-rounded" aria-hidden="true">
      {$darkMode ? 'light_mode' : 'dark_mode'}
    </span>
  </button>
</div>

<style lang="scss">
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
