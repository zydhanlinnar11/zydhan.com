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
    <div class="icon-container">
      <span
        class="material-symbols-rounded"
        style={`top: ${$darkMode ? 56 : 16}px;`}
        aria-hidden="true"
      >
        dark_mode
      </span>
      <span
        class="material-symbols-rounded"
        style={`top: ${$darkMode ? 16 : -24}px;`}
        aria-hidden="true"
      >
        light_mode
      </span>
    </div>
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
      padding: 0 16px;
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

  .icon-container {
    width: 24px;
    height: 56px;
    background-color: transparent;
    padding: 16px 0;
    position: relative;
  }

  .material-symbols-rounded {
    position: absolute;
    left: 0;

    transition-duration: var(--md-sys-motion-duration-long2);
    transition-timing-function: var(--md-sys-motion-easing-emphasized);
    transition-property: top;
  }
</style>
