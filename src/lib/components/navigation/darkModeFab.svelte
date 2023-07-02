<div>
  <button>
    <span aria-hidden={true}>
      dark mode
      <!-- {isDarkMode ? 'light_mode' : 'dark_mode'} -->
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
